<template>
  <!-- renderer -->
  <c-renderer class="w-full h-full bg-bg-light" />

  <!-- toolbar -->
  <c-toolbar :tools="$store.state.canvas.tools" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
  },
  setup() {
    const selectedTool = ref("text");

    return {
      selectedTool,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>