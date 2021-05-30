<template>
  <!-- canvas -->
  <main class="w-full h-full bg-bg-light"></main>

  <!-- toolbar -->
  <c-canvas-toolbar :tools="tools" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import CCanvasToolbar from "@/components/app/CCanvasToolbar.vue";

import textIcon from "@iconify-icons/feather/type";
import linkIcon from "@iconify-icons/feather/link";
import imageIcon from "@iconify-icons/feather/image";
import drawIcon from "@iconify-icons/feather/edit-2";
import checkpointIcon from "@iconify-icons/feather/flag";

export default defineComponent({
  name: "Canvas",
  components: {
    CCanvasToolbar,
  },
  setup() {
    const selectedTool = ref("text");
    const tools = reactive([
      { name: "text", icon: textIcon },
      { name: "link", icon: linkIcon },
      { name: "image", icon: imageIcon },
      { name: "draw", icon: drawIcon },
      { name: "checkpoint", icon: checkpointIcon },
    ]);

    return {
      selectedTool,
      tools,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>