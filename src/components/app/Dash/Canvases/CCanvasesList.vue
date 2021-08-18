<template>
  <div class="canvases-list h-full mt-14">
    <c-canvases-canvas v-for="(canvas, i) in canvases" :key="i" :canvas="canvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Canvas } from "@/store";

import CCanvasesCanvas from "./CCanvasesCanvas.vue";

export default defineComponent({
  name: "CCanvasesGrid",
  components: {
    CCanvasesCanvas,
  },
  props: {
    canvases: {
      type: Array as () => Canvas[],
      default: [],
    },
  },
});
</script>

<style lang="scss" scoped>
.canvases-list {
  display: grid;
  gap: 1.4rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>