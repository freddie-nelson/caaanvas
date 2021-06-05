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
        $store.state.canvas.selectedTool.name === tool.name
          ? 'text-accent-500 opacity-90'
          : 'focus:text-accent-300 focus:opacity-90'
      "
      @mousedown="
        handleClick(tool);
        $event.currentTarget.blur();
      "
      @keydown.enter.prevent="handleClick(tool)"
      @click="$event.currentTarget.blur()"
    >
      <Icon class="w-6 h-6" :icon="tool.icon" />
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon, IconifyIconData } from "@iconify/vue";
import { Tool, useStore } from "@/store";

export default defineComponent({
  name: "CCanvasToolbar",
  components: {
    Icon,
  },
  props: {
    tools: {
      type: Array as () => Tool[],
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const handleClick = (tool: { name: string; icon: IconifyIconData }) => {
      if (store.state.canvas.selectedTool.name === tool.name) {
        store.commit("SET_SELECTED_TOOL", { name: "" });
      } else {
        store.commit("SET_SELECTED_TOOL", tool);
      }
    };

    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>