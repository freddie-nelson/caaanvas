<template>
  <div
    ref="container"
    class="
      absolute
      top-5
      right-5
      rounded-md
      bg-bg-dark
      font-mono
      flex
      items-center
      p-4
      font-medium
      text-sm text-bg-light
    "
  >
    <button zoom-dropdown class="flex items-center focus:outline-none" @click="toggleZoomMenu">
      <p class="pointer-events-none">{{ $store.state.canvas.zoom.level }}%</p>

      <Icon
        class="pointer-events-none w-4 h-4 ml-1 transform transition-transform focus:rotate-180"
        :class="{ 'rotate-180': showZoomMenu }"
        :icon="icons.chevronDown"
      />
    </button>

    <div
      v-show="showZoomMenu"
      zoom-dropdown
      ui-element
      :style="{ right: `${zoomMenuRight + 3}px`, top: `${zoomMenuTop + 3}px` }"
      class="absolute bg-t-main px-4 py-2.5 rounded-md"
    >
      <button
        v-for="i in 10"
        :key="i"
        zoom-dropdown
        class="
          py-1.5
          focus:outline-none
          focus:text-primary-400
          transition-colors
          hover:text-primary-400
        "
        @click="
          $store.commit('SET_ZOOM_SCALE', i / 10);
          toggleZoomMenu($event);
        "
      >
        {{ i * 10 }}%
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useComponentEvent from "@/utils/useComponentEvent";

import { Icon } from "@iconify/vue";
import chevronDownIcon from "@iconify-icons/feather/chevron-down";

export default defineComponent({
  name: "CZoomControls",
  components: {
    Icon,
  },
  setup() {
    const container = ref(document.createElement("div"));

    const showZoomMenu = ref(false);
    const zoomMenuRight = ref(0);
    const zoomMenuTop = ref(0);

    const toggleZoomMenu = (e: MouseEvent) => {
      showZoomMenu.value = !showZoomMenu.value;

      const box = container.value.getBoundingClientRect();

      const mouseX = e.x || box.left + box.width;
      const mouseY = e.y || box.top + box.height / 2;

      const right = window.innerWidth - mouseX - (window.innerWidth - box.right);
      const top = mouseY - box.top;

      zoomMenuRight.value = right;
      zoomMenuTop.value = top;
    };

    useComponentEvent(document.body, "click", (e) => {
      if (!(e.target as Element).hasAttribute("zoom-dropdown")) showZoomMenu.value = false;
    });

    return {
      container,

      showZoomMenu,
      zoomMenuRight,
      zoomMenuTop,
      toggleZoomMenu,

      icons: {
        chevronDown: chevronDownIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>