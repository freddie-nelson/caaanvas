<template>
  <c-button-dropdown
    :show="showZoomMenu"
    @updateShow="showZoomMenu = $event"
    :forceClose="forceCloseMenu"
    tag="zoom-dropdown"
    class="font-mono flex items-center py-4 pl-4 font-medium text-sm text-bg-light"
  >
    <p class="pointer-events-none">{{ $store.state.canvas.zoom.level }}%</p>

    <Icon
      class="pointer-events-none w-4 h-4 ml-1 transform transition-transform focus:rotate-180"
      :class="{ 'rotate-180': showZoomMenu }"
      :icon="icons.chevronDown"
    />

    <template v-slot:menu>
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
          forceCloseMenu = !forceCloseMenu;
        "
      >
        {{ i * 10 }}%
      </button>
    </template>
  </c-button-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CButtonDropdown from "@/components/shared/Button/CButtonDropdown.vue";

import { Icon } from "@iconify/vue";
import chevronDownIcon from "@iconify-icons/feather/chevron-down";

export default defineComponent({
  name: "CZoomControls",
  components: {
    CButtonDropdown,
    Icon,
  },
  setup() {
    const showZoomMenu = ref(false);
    const forceCloseMenu = ref(false);

    return {
      showZoomMenu,
      forceCloseMenu,

      icons: {
        chevronDown: chevronDownIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>