<template>
  <div v-if="canvases.length > 0" class="canvases-list h-full mt-14">
    <c-canvases-canvas v-for="(canvas, i) in canvases" :key="i" :canvas="canvas" />
  </div>

  <div v-else class="w-full text-center mt-14">
    <p class="text-t-sub text-2xl font-semibold">
      You have no canvases,
      <router-link class="text-primary-500 hover:underline" to="/canvas">
        try creating one!
      </router-link>
    </p>
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