<template>
  <c-button-dropdown
    @updateShow="showNavMenu = $event"
    :forceClose="forceCloseMenu"
    flip
    tag="nav-dropdown"
    class="
      font-mono
      text-sm
      my-auto
      p-3
      focus:outline-none
      flex
      justify-center
      items-center
      text-bg-light
      hover:text-primary-500
      transition-colors
      duration-300
    "
  >
    <Icon class="w-6 h-6" :icon="icons.nav" />

    <template v-slot:menu>
      <button
        nav-dropdown
        class="
          p-2
          px-4
          text-bg-light
          flex
          items-center
          focus:outline-none
          rounded-sm
          my-2
          relative
          group
        "
        @click="$router.push({ name: 'DashCanvases' })"
      >
        <div
          class="
            absolute
            top-0
            rounded-sm
            left-0
            w-full
            h-full
            bg-bg-light
            opacity-10
            group-hover:opacity-20
            transition-opacity
            duration-300
          "
        ></div>
        <p
          class="whitespace-nowrap overflow-hidden overflow-ellipsis text-bg-light"
          style="max-width: 18ch"
        >
          Dashboard
        </p>
      </button>

      <button
        nav-dropdown
        class="
          w-full
          p-2
          px-4
          text-bg-light
          flex
          items-center
          focus:outline-none
          rounded-sm
          my-2
          relative
          group
        "
      >
        <div
          class="
            absolute
            top-0
            rounded-sm
            left-0
            w-full
            h-full
            bg-danger-500
            opacity-10
            group-hover:opacity-20
            transition-opacity
            duration-300
          "
        ></div>
        <p
          class="whitespace-nowrap overflow-hidden overflow-ellipsis mx-auto text-danger-600"
          style="max-width: 18ch"
        >
          Log Out
        </p>
      </button>
    </template>
  </c-button-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CButtonDropdown from "@/components/shared/Button/CButtonDropdown.vue";

import { Icon } from "@iconify/vue";
import navIcon from "@iconify-icons/feather/menu";

export default defineComponent({
  name: "CNavMenu",
  components: {
    CButtonDropdown,
    Icon,
  },
  setup() {
    const showNavMenu = ref(false);
    const forceCloseMenu = ref(false);

    return {
      showNavMenu,
      forceCloseMenu,

      icons: {
        nav: navIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>