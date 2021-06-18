<template>
  <div
    ref="renderer"
    class="renderer overflow-hidden relative"
    :style="{ cursor: canDrag ? 'grabbing' : null }"
    @click="addNewComponent"
  >
    <div
      v-for="(c, i) in visibleComponents"
      :ref="addRenderedComponent"
      :key="i"
      :index="`${c.index}`"
      :style="{ transform: `scale(${zoom.scale}) translate(${c.x}px, ${c.y}px)` }"
      class="absolute top-0 left-0"
      @click="handleComponentClick($event.currentTarget, i)"
    >
      <c-tool-text
        v-if="c.type === 'text'"
        :data="c.data"
        :open="selectedComponent && selectedComponent.index === c.index && isSelectedComponentOpen"
        @close="isSelectedComponentOpen = false"
        @update-data-key="c.data[$event.key] = $event.value"
      />
      <c-tool-link v-else-if="c.type === 'link'" :data="c.data" />
      <c-tool-image v-else-if="c.type === 'image'" :data="c.data" />
      <c-tool-draw v-else-if="c.type === 'draw'" :data="c.data" />
      <c-tool-flag v-else-if="c.type === 'flag'" :data="c.data" />
    </div>

    <c-options-menu
      :show="showOptions"
      :target="optionsTarget"
      @move="canMoveSelectedComponent = true"
      @delete="deleteSelectedComponent"
      @open="isSelectedComponentOpen = true"
    />
  </div>
</template>

<script lang="ts">
import { Component, useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";
import useComponentEvent from "@/utils/useComponentEvent";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";

import COptionsMenu from "@/components/app/Canvas/COptionsMenu.vue";
import CToolText from "@/components/app/Canvas/toolComponents/CToolText.vue";
import CToolLink from "@/components/app/Canvas/toolComponents/CToolLink.vue";
import CToolImage from "@/components/app/Canvas/toolComponents/CToolImage.vue";
import CToolDraw from "@/components/app/Canvas/toolComponents/CToolDraw.vue";
import CToolFlag from "@/components/app/Canvas/toolComponents/CToolFlag.vue";

export default defineComponent({
  name: "CRenderer",
  components: {
    COptionsMenu,
    CToolText,
    CToolLink,
    CToolImage,
    CToolDraw,
    CToolFlag,
  },
  setup(_, { emit }) {
    const store = useStore();

    const renderer = ref(document.createElement("div"));

    // track modifier key states
    const spaceHeld = ref(false);
    const controlHeld = ref(false);
    useComponentEvent(document.body, "keydown", (event) => {
      const e = <KeyboardEvent>event;

      switch (e.key) {
        case " ":
          spaceHeld.value = true;
          break;
        case "Control":
          controlHeld.value = true;
        default:
          break;
      }
    });
    useComponentEvent(document.body, "keyup", (event) => {
      const e = <KeyboardEvent>event;

      switch (e.key) {
        case " ":
          spaceHeld.value = false;
          break;
        case "Control":
          controlHeld.value = false;
        default:
          break;
      }
    });

    // handle panning around canvas
    // panning with scroll
    useComponentEvent(document.body, "wheel", (event) => {
      if (controlHeld.value) return;
      const e = <WheelEvent>event;

      boundaries.left += e.deltaX / 2;
      boundaries.right += e.deltaX / 2;
      boundaries.top += e.deltaY / 2;
      boundaries.bottom += e.deltaY / 2;
    });

    // panning with mouse wheel hold
    const mouseWheelHeld = ref(false);
    useComponentEvent(document.body, "mousedown", (event) => {
      const e = <MouseEvent>event;

      // mouse wheel pressed
      if (e.button === 1) {
        mouseWheelHeld.value = true;
      }
    });
    useComponentEvent(document.body, "mouseup", (event) => {
      const e = <MouseEvent>event;

      // mouse wheel released
      if (e.button === 1) {
        mouseWheelHeld.value = false;
      }
    });

    const canDrag = computed(
      () => (spaceHeld.value || mouseWheelHeld.value) && !store.state.canvas.selectedTool.name,
    );

    // setup mouse tracking
    const mouse = reactive<Mouse>({
      pressed: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      onMouseMove: (e) => {
        if (!e || !mouse.pressed || !canDrag.value) return;

        const diffX = (mouse.lastX - mouse.x) / zoom.value.scale;
        const diffY = (mouse.lastY - mouse.y) / zoom.value.scale;

        boundaries.left += diffX;
        boundaries.right += diffX;
        boundaries.top += diffY;
        boundaries.bottom += diffY;
      },
    });
    let stopMouse: () => void;

    onMounted(() => {
      const temp = useMouse(renderer.value, mouse);
      stopMouse = temp.stopMouse;
    });
    onUnmounted(() => {
      stopMouse();
    });

    // calculate current portion of the canvas that is being viewed
    const boundaries = reactive({
      left: 0,
      right: window.innerWidth,
      top: 0,
      bottom: window.innerHeight,
    });

    watch(boundaries, () => {
      emit("view-changed", boundaries);
    });

    // handle zoom in/out with ctrl + mwheel
    const zoom = computed(() => store.state.canvas.zoom);

    const calculateZoomOffsets = (
      scale: number,
      direction: number,
      xPivot: number = mouse.x,
      yPivot: number = mouse.y,
    ) => {
      const currentDiffX = Math.abs(window.innerWidth - (boundaries.right - boundaries.left));
      const currentDiffY = Math.abs(window.innerHeight - (boundaries.bottom - boundaries.top));

      let desiredDiffX = window.innerWidth / scale - window.innerWidth;
      let desiredDiffY = window.innerHeight / scale - window.innerHeight;

      if (direction === 1) {
        desiredDiffX -= currentDiffX;
        desiredDiffY -= currentDiffY;
      } else {
        desiredDiffX = currentDiffX - desiredDiffX;
        desiredDiffY = currentDiffY - desiredDiffY;
      }

      const left = desiredDiffX * (xPivot / window.innerWidth);
      const top = desiredDiffY * (yPivot / window.innerHeight);

      return {
        left: left,
        right: desiredDiffX - left,
        top: top,
        bottom: desiredDiffY - top,
      };
    };

    const zoomBoundaries = (
      offsets: ReturnType<typeof calculateZoomOffsets>,
      direction: number,
    ) => {
      boundaries.left -= offsets.left * direction;
      boundaries.right += offsets.right * direction;
      boundaries.top -= offsets.top * direction;
      boundaries.bottom += offsets.bottom * direction;
    };

    useComponentEvent(
      document.body,
      "wheel",
      (event) => {
        const e = <WheelEvent>event;
        if (!controlHeld.value || e.deltaY === 0) return;

        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;
        const scale =
          e.deltaY > 0
            ? Math.max(zoom.value.scale - 0.1, 0.1)
            : Math.min(zoom.value.scale + 0.1, 1);

        if (scale === zoom.value.scale) return;

        const zoomOffsets = calculateZoomOffsets(scale, direction);
        zoomBoundaries(zoomOffsets, direction);

        store.commit("SET_ZOOM_SCALE", scale);
      },
      { passive: false },
    );

    // handle zooming with ctrl + -/=
    useComponentEvent(document.body, "keydown", (event) => {
      if (!controlHeld.value) return;
      const e = <KeyboardEvent>event;

      let direction: number;
      let scale: number;

      switch (e.key) {
        case "=":
        case "+":
          e.preventDefault();
          direction = -1;
          scale = Math.min(zoom.value.scale + 0.1, 1);
          break;
        case "-":
          e.preventDefault();
          direction = 1;
          scale = Math.max(zoom.value.scale - 0.1, 0.1);
          break;
        default:
          return;
      }

      if (scale === zoom.value.scale) return;

      const zoomOffsets = calculateZoomOffsets(scale, direction);
      zoomBoundaries(zoomOffsets, direction);

      store.commit("SET_ZOOM_SCALE", scale);
    });

    watch(zoom.value, (zoom) => {
      // when true update boundaries as scale and boundaries are out of sync
      const currentScale = window.innerWidth / (boundaries.right - boundaries.left);
      if (zoom.scale !== currentScale) {
        const direction = currentScale - zoom.scale < 0 ? -1 : 1;

        const zoomOffsets = calculateZoomOffsets(
          zoom.scale,
          direction,
          window.innerWidth / 2,
          window.innerHeight / 2,
        );
        zoomBoundaries(zoomOffsets, direction);
      }
    });

    // find components that are currently within boundaries
    const components = store.state.canvas.current.components;
    let visibleComponents = computed(() => {
      const temp: Component[] = [];
      const padding =
        window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

      components.forEach((c, i) => {
        if (
          c.x > boundaries.left - padding &&
          c.x < boundaries.right + padding &&
          c.y > boundaries.top - padding &&
          c.y < boundaries.bottom + padding
        ) {
          temp.push({
            type: c.type,
            x: c.x - boundaries.left,
            y: c.y - boundaries.top,
            data: c.data,
            index: i,
          });
        }
      });

      return temp;
    });

    const addNewComponent = (e: MouseEvent) => {
      if (store.state.canvas.selectedTool.name) {
        const x = e.clientX / zoom.value.scale + boundaries.left;
        const y = e.clientY / zoom.value.scale + boundaries.top;

        const component: Component = {
          x,
          y,
          type: store.state.canvas.selectedTool.name,
          data: {},
        };
        store.commit("ADD_COMPONENT", component);

        store.commit("SET_SELECTED_TOOL", { name: "" });

        nextTick(() => {
          const children = renderer.value.children;
          if (children.length - 2 < 0) return;

          const element = <HTMLDivElement>children[children.length - 2];
          requestAnimationFrame(() => element.click());
        });
      }
    };

    const showOptions = ref(false);
    const optionsTarget = ref<Element>();
    let selectedComponent = ref<Component>();

    const setOptionsTarget = (target: Element) => {
      optionsTarget.value?.classList.remove("z-10");
      target.classList.add("z-10");
      optionsTarget.value = target;
    };

    let renderedComponents: HTMLDivElement[] = [];

    const addRenderedComponent = (el: HTMLDivElement) => {
      if (el) renderedComponents.push(el);
    };
    onBeforeUpdate(() => {
      renderedComponents = [];
    });

    let lastTargetIndex = "";
    const findSelectedComponent = (rendered: HTMLDivElement[]) => {
      if (
        optionsTarget.value &&
        optionsTarget.value.getAttribute("index") === lastTargetIndex &&
        optionsTarget.value.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_CONTAINS
      )
        return;

      rendered.forEach((c) => {
        const index = Number(c.getAttribute("index"));
        if (selectedComponent.value?.index === index) {
          // console.log(index + " " + selectedComponent?.index);
          selectedComponent.value = visibleComponents.value.find((c) => c.index === index);

          setOptionsTarget(c);
        }
      });
    };
    onUpdated(() => {
      findSelectedComponent(renderedComponents);
    });

    const handleComponentClick = (target: Element, ci: number) => {
      showOptions.value = !showOptions.value;
      setOptionsTarget(target);

      selectedComponent.value = visibleComponents.value[ci];
    };

    // moving components with mouse
    const canMoveSelectedComponent = ref(false);
    watch(mouse, () => {
      if (
        !canMoveSelectedComponent.value ||
        !selectedComponent.value ||
        selectedComponent.value.index === undefined
      )
        return;

      const diffX = (mouse.lastX - mouse.x) / zoom.value.scale;
      const diffY = (mouse.lastY - mouse.y) / zoom.value.scale;

      const rawSelectedComponent = components[selectedComponent.value.index];
      const newX = rawSelectedComponent.x - diffX;
      const newY = rawSelectedComponent.y - diffY;

      store.commit("SET_COMPONENT_POSITION", {
        index: selectedComponent.value.index,
        x: newX,
        y: newY,
      });
    });

    useComponentEvent(document.body, "mouseup", () => {
      if (canMoveSelectedComponent.value) canMoveSelectedComponent.value = false;
    });

    // delete selected component
    const deleteSelectedComponent = () => {
      if (!selectedComponent.value || selectedComponent.value.index === undefined) return;

      showOptions.value = !showOptions.value;
      optionsTarget.value = undefined;
      store.commit("REMOVE_COMPONENT", selectedComponent.value.index);
    };

    // open selected component
    const isSelectedComponentOpen = ref(false);

    return {
      renderer,
      mouse,
      canDrag,
      boundaries,
      zoom,
      visibleComponents,
      addNewComponent,
      addRenderedComponent,
      showOptions,
      optionsTarget,
      setOptionsTarget,
      handleComponentClick,
      selectedComponent,
      canMoveSelectedComponent,
      deleteSelectedComponent,
      isSelectedComponentOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.renderer * {
  transform-origin: top left;
}
</style>