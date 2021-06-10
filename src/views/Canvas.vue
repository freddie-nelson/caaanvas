<template>
  <c-renderer class="w-full h-full bg-bg-light" />

  <transition name="fade">
    <div
      v-if="showToolCursor"
      class="absolute top-0 left-0 w-8 h-8 p-2 ml-1 mt-1 rounded-md bg-bg-dark pointer-events-none"
      :style="{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }"
    >
      <Icon class="text-bg-light w-full h-full" :icon="$store.state.canvas.selectedTool.icon" />

      <div class="absolute -top-4 -left-4 w-4 h-4 flex justify-center items-center">
        <div class="w-1 h-full absolute transform rotate-90 bg-bg-dark rounded-full"></div>
        <div class="w-1 h-full absolute bg-bg-dark rounded-full"></div>
      </div>
    </div>
  </transition>

  <c-toolbar ui-element :tools="$store.state.canvas.tools" />

  <c-zoom-controls ui-element />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";
import CZoomControls from "@/components/app/Canvas/CZoomControls.vue";

import { Icon } from "@iconify/vue";
import useComponentEvent from "@/utils/useComponentEvent";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
    CZoomControls,
    Icon,
  },
  setup() {
    const store = useStore();

    // setup toolbar keybindings
    useComponentEvent(document.body, "keyup", (e) => {
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
      mouse,
      showToolCursor,
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