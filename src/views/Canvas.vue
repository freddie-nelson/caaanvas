<template>
  <!-- renderer -->
  <c-renderer class="w-full h-full bg-bg-light" />

  <!-- toolbar -->
  <c-toolbar :tools="tools" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";

import textIcon from "@iconify-icons/feather/type";
import linkIcon from "@iconify-icons/feather/link";
import imageIcon from "@iconify-icons/feather/image";
import drawIcon from "@iconify-icons/feather/edit-2";
import checkpointIcon from "@iconify-icons/feather/flag";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
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