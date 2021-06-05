<template>
  <div
    ref="renderer"
    class="overflow-hidden relative"
    :style="{ cursor: canDrag ? 'grabbing' : null }"
    @click="addNewComponent"
  >
    <div
      v-for="(c, i) in visibleComponents"
      :key="i"
      :style="{ transform: `translate(${c.x}px, ${c.y}px)` }"
      class="absolute top-0 left-0 w-20 h-20 bg-bg-dark rounded-lg"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";
import useComponentEvent from "@/utils/useComponentEvent";
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watchEffect } from "vue";

export default defineComponent({
  name: "CRenderer",
  components: {},
  setup() {
    const store = useStore();

    const renderer = ref(document.createElement("div"));

    // handle panning around canvas
    const spaceHeld = ref(false);
    useComponentEvent(
      document.body,
      "keydown",
      (e) => (spaceHeld.value = (e as KeyboardEvent).key === " "),
    );
    useComponentEvent(document.body, "keyup", (e) =>
      (e as KeyboardEvent).key === " " ? (spaceHeld.value = false) : null,
    );

    const canDrag = computed(() => spaceHeld.value && !store.state.canvas.selectedTool.name);
    const dragging = computed(() => mouse.pressed && canDrag.value);

    const mouse = reactive<Mouse>({
      pressed: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
    });
    let stopMouse: () => void;

    const diffX = computed(() => mouse.x - mouse.lastX);
    const diffY = computed(() => mouse.y - mouse.lastY);

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
    watchEffect(() => {
      if (dragging.value) {
        boundaries.left -= diffX.value;
        boundaries.right = boundaries.left + window.innerWidth;
        boundaries.top -= diffY.value;
        boundaries.bottom = boundaries.top + window.innerHeight;
      }
    });

    // find components that are currently within boundaries
    const components = store.state.canvas.current.components;
    let visibleComponents = computed(() => {
      const temp: Component[] = [];

      components.forEach((c) => {
        if (
          c.x > boundaries.left - 1000 &&
          c.x < boundaries.right + 1000 &&
          c.y > boundaries.top - 1000 &&
          c.y < boundaries.bottom + 1000
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
        const x = e.clientX + boundaries.left;
        const y = e.clientY + boundaries.top;

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
      visibleComponents,
      boundaries,
      addNewComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>