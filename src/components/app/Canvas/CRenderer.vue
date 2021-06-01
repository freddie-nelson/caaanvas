<template>
  <div
    ref="renderer"
    class="overflow-hidden relative"
    :style="{ cursor: dragging ? 'grabbing' : null }"
  >
    <div
      v-for="(object, i) in objects"
      :key="i"
      :style="{ transform: `translate(${object.x}px, ${object.y}px)` }"
      class="absolute top-0 left-0 w-20 h-20 bg-bg-dark rounded-lg"
    ></div>
  </div>
</template>

<script lang="ts">
import { Mouse, useMouse } from "@/utils/useMouse";
import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from "vue";

export default defineComponent({
  name: "CRenderer",
  components: {},
  setup() {
    const renderer = ref(document.createElement("div"));

    const canDrag = ref(false);
    const dragging = computed(() => mouse.pressed && canDrag.value);

    const mouse = reactive<Mouse>({
      pressed: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      onMouseDown: (e?: MouseEvent) => {
        if (e?.target === renderer.value) canDrag.value = true;
      },
      onMouseUp: (e?: MouseEvent) => {
        canDrag.value = false;
      },
      onMouseMove: null,
    });
    let stopMouse: () => void;

    const diffX = computed(() => mouse.x - mouse.lastX);
    const diffY = computed(() => mouse.y - mouse.lastY);

    onMounted(() => {
      const temp = useMouse(renderer.value, mouse);
      stopMouse = temp.stopMouse;
    });

    const objects = reactive([
      { x: 0, y: 0 },
      { x: 100, y: 200 },
      { x: -400, y: -500 },
      { x: 1000, y: 1200 },
      { x: 300, y: 750 },
    ]);

    watchEffect(() => {
      if (dragging.value) {
        objects.forEach((object) => {
          object.x += diffX.value;
          object.y += diffY.value;
        });
      }
    });

    return {
      renderer,
      mouse,
      dragging,
      objects,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>