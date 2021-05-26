<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";

export default defineComponent({
  name: "CPaintCanvas",
  components: {},
  props: {
    fadeOut: {
      type: Boolean,
      default: false,
    },
    useWindow: {
      type: Boolean,
      default: false,
    },
    brushColor: {
      type: String,
      default: "red",
    },
    brushSize: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { emit }) {
    const canvas = ref(document.createElement("canvas"));
    let ctx: CanvasRenderingContext2D | null = null;

    const isMouseDown = ref(false);
    const mouseX = ref(-100);
    const mouseY = ref(-100);

    watch(isMouseDown, () => {
      if (!isMouseDown.value) return;
    });

    const drawCircle = () => {
      ctx = <CanvasRenderingContext2D>ctx;
      ctx.beginPath();
      ctx.arc(mouseX.value, mouseY.value, props.brushSize, 0, 2 * Math.PI, false);
      ctx.fillStyle = props.brushColor;
      ctx.fill();

      emit("paint");
    };

    const handleMouseDown = () => {
      isMouseDown.value = true;
      drawCircle();
    };
    const handleMouseUp = () => {
      isMouseDown.value = false;
    };
    const handleMouseMove = (e: Event | Touch) => {
      if (!canvas.value) return;

      const event = <MouseEvent>e;
      const box = canvas.value.getBoundingClientRect();
      mouseX.value = event.clientX - box.left;
      mouseY.value = event.clientY - box.top;

      if (isMouseDown.value) {
        drawCircle();
      }
    };

    const handleTouchStart = (e: Event) => {
      if (!canvas.value) return;

      const tap = (e as TouchEvent).touches[0];
      const box = canvas.value.getBoundingClientRect();
      mouseX.value = tap.clientX - box.left;
      mouseY.value = tap.clientY - box.top;

      handleMouseDown();
    };
    const handleTouchMove = (e: Event) => {
      const tap = (e as TouchEvent).touches[0];
      handleMouseMove(tap);
    };

    const setupCanvas = () => {
      canvas.value.width = canvas.value.clientWidth;
      canvas.value.height = canvas.value.clientHeight;

      ctx = canvas.value.getContext("2d");
      if (!ctx) return;

      const element = props.useWindow ? window : canvas.value;

      // desktop
      element.addEventListener("mousedown", handleMouseDown);
      element.addEventListener("mouseup", handleMouseUp);
      element.addEventListener("mousemove", handleMouseMove);

      // mobile
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchend", handleMouseUp);
      element.addEventListener("touchmove", handleTouchMove);

      window.addEventListener("mousemove", (e) => {
        if (!isMouseDown.value || !canvas.value) return;

        const box = canvas.value.getBoundingClientRect();
        if (
          e.clientX < box.left ||
          e.clientX > box.left + box.width ||
          e.clientY < box.top ||
          e.clientY > box.top + box.height
        )
          isMouseDown.value = false;
      });
    };

    const fadeOut = () => {
      ctx = <CanvasRenderingContext2D>ctx;
      ctx.fillStyle = "rgba(255, 255, 255, 0.17)";
      ctx.fillRect(0, 0, canvas.value?.width, canvas.value?.height);

      if (canvas.value) setTimeout(fadeOut, 41); // 24 times per second
    };

    const resizeObserver = new ResizeObserver(() => {
      canvas.value.width = canvas.value.clientWidth;
      canvas.value.height = canvas.value.clientHeight;
    });

    onMounted(() => {
      setupCanvas();

      if (props.fadeOut) {
        fadeOut();
      }

      resizeObserver.observe(canvas.value);
    });

    onUnmounted(() => {
      resizeObserver.disconnect();

      if (props.useWindow) {
        // desktop
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);

        // mobile
        window.removeEventListener("touchstart", handleMouseUp);
        window.removeEventListener("touchend", handleMouseDown);
        window.removeEventListener("touchmove", handleTouchMove);
      }
    });

    return { canvas };
  },
});
</script>

<style lang="scss" scoped>
</style>