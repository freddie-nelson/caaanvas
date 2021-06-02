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
        $store.state.canvas.selectedTool === tool.name
          ? 'text-accent-500 opacity-90'
          : 'focus:text-accent-300 focus:opacity-90'
      "
      @click="handleClick($event, tool)"
    >
      <Icon class="w-6 h-6" :icon="tool.icon" />
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { Icon, IconifyIconData } from "@iconify/vue";
import { useStore } from "@/store";

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
    const store = useStore();

    const handleClick = (e: MouseEvent, tool: { name: string; icon: IconifyIconData }) => {
      (e.currentTarget as HTMLElement).blur();

      if (store.state.canvas.selectedTool === tool.name) {
        store.commit("SET_SELECTED_TOOL", "");
      } else {
        store.commit("SET_SELECTED_TOOL", tool.name);
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