<template>
  <c-renderer class="w-full h-full bg-bg-light" />

  <c-toolbar :tools="$store.state.canvas.tools" />

  <c-zoom-controls ui-element />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";
import CZoomControls from "@/components/app/Canvas/CZoomControls.vue";

import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
    CZoomControls,
    Icon,
  },
});
</script>

<style lang="scss" scoped>
</style>