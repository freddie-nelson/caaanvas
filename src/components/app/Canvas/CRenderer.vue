<template>
  <div ref="renderer"></div>
</template>

<script lang="ts">
import { Mouse, useMouse } from "@/utils/useMouse";
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

export default defineComponent({
  name: "CRenderer",
  components: {},
  setup() {
    const renderer = ref(document.createElement("div"));

    const mouse = reactive<Mouse>({
      pressed: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      onMouseDown: null,
      onMouseUp: null,
      onMouseMove: null,
    });
    let stopMouse: () => void;

    const diffX = computed(() => mouse.x - mouse.lastX);
    const diffY = computed(() => mouse.y - mouse.lastY);

    const isSpaceHeld = ref(false);
    const handleKeyDown = (e: KeyboardEvent) => (e.key === " " ? (isSpaceHeld.value = true) : null);
    const handleKeyUp = (e: KeyboardEvent) => (e.key === " " ? (isSpaceHeld.value = false) : null);

    onMounted(() => {
      const temp = useMouse(renderer.value, mouse);
      stopMouse = temp.stopMouse;

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    });

    return {
      renderer,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>