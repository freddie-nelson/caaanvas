<template>
  <transition name="fade">
    <div
      v-if="showToolCursor"
      class="
        absolute
        top-0
        left-0
        w-8
        h-8
        p-2
        ml-1
        mt-1
        rounded-md
        bg-bg-dark
        pointer-events-none
        z-10
      "
      :style="{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }"
    >
      <Icon class="text-bg-light w-full h-full" :icon="$store.state.canvas.selectedTool.icon" />

      <div class="absolute -top-4 -left-4 w-4 h-4 flex justify-center items-center">
        <div class="w-1 h-full absolute transform rotate-90 bg-bg-dark rounded-full"></div>
        <div class="w-1 h-full absolute bg-bg-dark rounded-full"></div>
      </div>
    </div>
  </transition>

  <aside
    ui-element
    class="
      z-10
      absolute
      left-4
      top-0
      bottom-0
      my-auto
      text-bg-light
      flex flex-col
      w-12
      bg-bg-dark
      rounded-md
      overflow-hidden
    "
    style="height: min-content"
  >
    <button
      v-for="tool in tools"
      :key="tool.name"
      class="
        w-full
        h-12
        my-2
        bg-bg-dark
        flex
        justify-center
        items-center
        opacity-40
        hover:opacity-90
        transition-all
        duration-300
        outline-none
        focus:outline-none
      "
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
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from "vue";

import { Icon, IconifyIconData } from "@iconify/vue";
import { Tool, useStore } from "@/store";
import useComponentEvent from "@/utils/useComponentEvent";
import { Mouse, useMouse } from "@/utils/useMouse";

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

    // setup toolbar keybindings
    useComponentEvent(document.body, "keyup", (e) => {
      if (
        document.activeElement &&
        document.activeElement.tagName.match(/(INPUT)|(TEXTAREA)/) !== null
      )
        return;

      const index = Number((e as KeyboardEvent).key) - 1;

      if (index !== NaN && index >= 0 && index < store.state.canvas.tools.length) {
        const tool = store.state.canvas.tools[index];

        if (store.state.canvas.selectedTool.name === tool.name) {
          store.commit("SET_SELECTED_TOOL", { name: "" });
        } else {
          store.commit("SET_SELECTED_TOOL", tool);
        }

        showToolCursor.value = true;
      }
    });

    // setup tool cursor
    const showToolCursor = ref(false);
    watch(
      computed(() => store.state.canvas.selectedTool),
      (selectedTool) => {
        if (selectedTool.name === "") {
          document.body.style.cursor = "";
          showToolCursor.value = false;
          return;
        }

        document.body.style.cursor = "none";
      },
    );

    // hide tool cursor when mouse enters elements tagged with ui-element
    let uiElements: Element[] = [];
    const handleMouseOver = () => {
      showToolCursor.value = false;
      document.body.style.cursor = "";
    };
    const handleMouseLeave = () => {
      if (store.state.canvas.selectedTool.name !== "") {
        showToolCursor.value = true;
        document.body.style.cursor = "none";
      }
    };

    onMounted(() => {
      uiElements = Array.from(document.querySelectorAll("[ui-element]"));

      uiElements.forEach((element) => {
        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    });
    onUnmounted(() => {
      uiElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    const mouse = reactive<Mouse>({
      pressed: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
    });
    let stopMouse: () => void;

    onMounted(() => {
      const temp = useMouse(document.body, mouse);
      stopMouse = temp.stopMouse;

      document.body.style.overflow = "hidden";
    });

    onUnmounted(() => {
      stopMouse();

      document.body.style.overflow = "";
    });

    return {
      handleClick,
      showToolCursor,
      mouse,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>