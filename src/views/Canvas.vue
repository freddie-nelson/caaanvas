<template>
  <c-renderer class="w-full h-full bg-bg-light" />

  <c-toolbar
    @mouseenter="showToolCursor = false"
    @mouseleave="$store.state.canvas.selectedTool.name !== '' ? (showToolCursor = true) : null"
    :tools="$store.state.canvas.tools"
  />

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
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, onUnmounted, reactive, ref } from "vue";
import { useStore } from "@/store";
import { Mouse, useMouse } from "@/utils/useMouse";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";

import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
    Icon,
  },
  setup() {
    const store = useStore();

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