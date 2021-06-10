<template>
  <div
    ref="renderer"
    class="renderer overflow-hidden relative"
    :style="{ cursor: canDrag ? 'grabbing' : null }"
    @click="addNewComponent"
  >
    <div
      v-for="(c, i) in visibleComponents"
      :key="i"
      :style="{ transform: `scale(${zoom.scale}) translate(${c.x}px, ${c.y}px)` }"
      class="absolute top-0 left-0 w-20 h-20 bg-bg-dark rounded-lg"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";
import useComponentEvent from "@/utils/useComponentEvent";
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "CRenderer",
  components: {},
  setup() {
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

    const resetBoundaries = () => {
      boundaries.left = 0;
      boundaries.right = window.innerWidth;
      boundaries.top = 0;
      boundaries.bottom = window.innerHeight;
    };

    // handle zoom in/out with ctrl + mwheel
    const zoom = computed(() => store.state.canvas.zoom);

    const calculateZoomOffsets = (
      xPivot: number = mouse.x,
      yPivot: number = mouse.y,
      factor: number = zoom.value.factor,
    ) => {
      return {
        left: Math.floor(xPivot / factor),
        right: Math.floor((window.innerWidth - xPivot) / factor),
        top: Math.floor(yPivot / factor),
        bottom: Math.floor((window.innerHeight - yPivot) / factor),
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
        if (!controlHeld.value) return;
        const e = <WheelEvent>event;
        e.preventDefault();

        const zoomOffsets = calculateZoomOffsets();
        let direction = 1;

        if (e.deltaY > 0) {
          if (zoom.value.scale < 0.1) return;
        } else if (e.deltaY < 0) {
          if (zoom.value.scale > 1) return;

          direction = -1;
        }

        zoomBoundaries(zoomOffsets, direction);

        store.commit("SET_ZOOM_SCALE", window.innerWidth / (boundaries.right - boundaries.left));
      },
      { passive: false },
    );

    watch(zoom.value, (zoom) => {
      // when true update boundaries as scale and boundaries are out of sync
      const currentScale = window.innerWidth / (boundaries.right - boundaries.left);
      if (zoom.scale !== currentScale) {
        const direction = currentScale - zoom.scale < 0 ? -1 : 1;

        const currentDiffX = Math.abs(
          (window.innerWidth - (boundaries.right - boundaries.left)) / 2,
        );
        const currentDiffY = Math.abs(
          (window.innerHeight - (boundaries.bottom - boundaries.top)) / 2,
        );

        let desiredDiffX = (window.innerWidth / zoom.scale - window.innerWidth) / 2;
        let desiredDiffY = (window.innerHeight / zoom.scale - window.innerHeight) / 2;

        if (direction === 1) {
          desiredDiffX -= currentDiffX;
          desiredDiffY -= currentDiffY;
        } else {
          desiredDiffX = currentDiffX - desiredDiffX;
          desiredDiffY = currentDiffY - desiredDiffY;
        }

        const zoomOffsets = {
          left: desiredDiffX,
          right: desiredDiffX,
          top: desiredDiffY,
          bottom: desiredDiffY,
        };
        zoomBoundaries(zoomOffsets, direction);
      }
    });

    // find components that are currently within boundaries
    const components = store.state.canvas.current.components;
    let visibleComponents = computed(() => {
      const temp: Component[] = [];
      const padding =
        window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

      components.forEach((c) => {
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
      }
    };

    return {
      renderer,
      mouse,
      canDrag,
      boundaries,
      zoom,
      visibleComponents,
      addNewComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.renderer * {
  transform-origin: top left;
}
</style>