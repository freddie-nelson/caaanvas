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

    const allObjects: { x: number; y: number }[] = [];

    for (let i = 0; i < 100; i++) {
      allObjects.push({
        x: Math.floor(Math.random() * 4000) - 2000,
        y: Math.floor(Math.random() * 4000) - 2000,
      });
    }

    let objects = reactive<{ x: number; y: number }[]>([]);

    const findObjectsToRender = () => {
      objects.length = 0;
      allObjects.forEach((o) => {
        if (
          o.x > boundaries.left - 1000 &&
          o.x < boundaries.right + 1000 &&
          o.y > boundaries.top - 1000 &&
          o.y < boundaries.bottom + 1000
        ) {
          objects.push({ x: o.x - boundaries.left, y: o.y - boundaries.top });
        }
      });
    };

    onMounted(() => findObjectsToRender());

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

        findObjectsToRender();
      }
    });

    return {
      renderer,
      mouse,
      dragging,
      objects,
      boundaries,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>