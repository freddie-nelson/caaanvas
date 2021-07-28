<template>
  <c-button-dropdown
    @updateShow="showAccountMenu = $event"
    :forceClose="forceCloseMenu"
    tag="nav-account-dropdown"
    class="
      font-mono
      text-sm
      my-auto
      p-3
      focus:outline-none
      flex
      justify-center
      items-center
      account-dropdown
    "
  >
    <div
      class="
        bg-bg-dark
        absolute
        left-0
        w-full
        py-8
        rounded-lg
        opacity-0
        account-dropdown-hover:opacity-10
        transition-opacity
        duration-300
      "
    ></div>

    <div
      class="
        relative
        rounded-md
        w-12
        h-12
        flex
        justify-center
        items-center
        bg-accent-400
        text-xl text-bg-light
        font-bold
      "
    >
      F
    </div>

    <Icon
      :icon="icons.chevronDown"
      class="ml-2 w-6 h-6 transform transition-transform duration-300 text-t-main"
      :class="{ 'rotate-180': showAccountMenu }"
    />

    <template v-slot:menu>
      <c-account-button bgClass="bg-success-500" textClass="text-success-600" :icon="icons.canvas">
        New Canvas
      </c-account-button>

      <router-link to="/dash">
        <c-account-button bgClass="bg-bg-light" textClass="text-bg-light" :icon="icons.dashboard">
          Canvases
        </c-account-button>
      </router-link>

      <router-link to="/dash/profile">
        <c-account-button bgClass="bg-bg-light" textClass="text-bg-light" :icon="icons.profile">
          Profile
        </c-account-button>
      </router-link>

      <router-link to="/dash/settings">
        <c-account-button bgClass="bg-bg-light" textClass="text-bg-light" :icon="icons.settings">
          Settings
        </c-account-button>
      </router-link>

      <c-account-button bgClass="bg-danger-500" textClass="text-danger-600" :icon="icons.logOut">
        Log Out
      </c-account-button>
    </template>
  </c-button-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CButtonDropdown from "@/components/shared/Button/CButtonDropdown.vue";
import CAccountButton from "./CAccountButton.vue";

import { Icon } from "@iconify/vue";
import chevronDownIcon from "@iconify-icons/feather/chevron-down";
import logOutIcon from "@iconify-icons/feather/log-out";
import dashboardIcon from "@iconify-icons/feather/layout";
import profileIcon from "@iconify-icons/feather/user";
import settingsIcon from "@iconify-icons/feather/settings";
import canvasIcon from "@iconify-icons/feather/edit";

export default defineComponent({
  name: "CNavAccount",
  components: {
    CButtonDropdown,
    CAccountButton,
    Icon,
  },
  setup() {
    const showAccountMenu = ref(false);
    const forceCloseMenu = ref(false);

    return {
      showAccountMenu,
      forceCloseMenu,

      icons: {
        chevronDown: chevronDownIcon,
        logOut: logOutIcon,
        dashboard: dashboardIcon,
        profile: profileIcon,
        settings: settingsIcon,
        canvas: canvasIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.account-dropdown:hover .account-dropdown-hover\:opacity-10 {
  opacity: 0.1;
}
</style>