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
      :style="{ transform: `scale(${zoomScale}) translate(${c.x}px, ${c.y}px)` }"
      class="absolute top-0 left-0 w-20 h-20 bg-bg-dark rounded-lg"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";
import useComponentEvent from "@/utils/useComponentEvent";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";

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

        const diffX = (mouse.lastX - mouse.x) / zoomScale.value;
        const diffY = (mouse.lastY - mouse.y) / zoomScale.value;

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

    // handle zoom in/out with ctrl + mwheel
    const zoomScale = ref(1);
    const zoomX = window.innerWidth / 4;
    const zoomY = window.innerHeight / 4;

    useComponentEvent(
      document.body,
      "wheel",
      (event) => {
        if (!controlHeld.value) return;
        const e = <WheelEvent>event;
        e.preventDefault();

        if (e.deltaY > 0) {
          if (zoomScale.value < 0.19) return;

          zoomScale.value -= 0.1;

          boundaries.left -= zoomX / zoomScale.value;
          boundaries.right += zoomX / zoomScale.value;

          boundaries.top -= zoomY / zoomScale.value;
          boundaries.bottom += zoomY / zoomScale.value;
        } else if (e.deltaY < 0) {
          if (zoomScale.value > 0.91) return;

          boundaries.left += zoomX / zoomScale.value;
          boundaries.right -= zoomX / zoomScale.value;

          boundaries.top += zoomY / zoomScale.value;
          boundaries.bottom -= zoomY / zoomScale.value;

          zoomScale.value += 0.1;
        }
      },
      { passive: false },
    );

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
        const x = e.clientX / zoomScale.value + boundaries.left;
        const y = e.clientY / zoomScale.value + boundaries.top;

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
      zoomScale,
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