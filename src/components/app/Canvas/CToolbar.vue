<template>
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
      @click="selectedTool = tool.name"
    >
      <Icon class="w-6 h-6" :icon="tool.icon" />
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "CCanvasToolbar",
  components: {
    Icon,
  },
  props: {
    tools: {
      type: Array as () => { name: string; icon: string }[],
      required: true,
    },
  },
  setup(props) {
    const selectedTool = ref(props.tools[0].name);

    return {
      selectedTool,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>