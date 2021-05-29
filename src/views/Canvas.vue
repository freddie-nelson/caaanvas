<template>
  <!-- canvas -->
  <main class="w-full h-full bg-bg-light"></main>

  <!-- toolbar -->
  <aside
    class="absolute left-4 top-0 bottom-0 my-auto text-bg-light flex flex-col w-12 bg-bg-dark rounded-md overflow-hidden"
    style="height: min-content"
  >
    <button
      v-for="tool in tools"
      :key="tool.name"
      class="w-full h-12 my-2 bg-bg-dark flex justify-center items-center opacity-40 hover:opacity-90 transition-all duration-300 outline-none focus:outline-none"
      :class="
        selectedTool === tool.name
          ? 'text-accent-500 opacity-90'
          : 'focus:text-accent-300 focus:opacity-90'
      "
    >
      <Icon class="w-6 h-6" :icon="tool.icon" />
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { Icon } from "@iconify/vue";
import textIcon from "@iconify-icons/feather/type";
import linkIcon from "@iconify-icons/feather/link";
import imageIcon from "@iconify-icons/feather/image";
import drawIcon from "@iconify-icons/feather/edit-2";
import checkpointIcon from "@iconify-icons/feather/flag";

export default defineComponent({
  name: "Canvas",
  components: {
    Icon,
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