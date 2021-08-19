<template>
  <router-link
    class="
      relative
      flex
      items-center
      justify-center
      font-mono font-medium
      text-primary-600
      rounded-md
      py-3.5
      px-4
      focus:outline-none
      group
    "
    to="/dash/plans"
  >
    <div
      class="
        absolute
        top-0
        left-0
        rounded-md
        w-full
        h-full
        bg-primary-500
        opacity-20
        group-hover:opacity-30
        transition-opacity
        duration-300
      "
    ></div>
    <Icon class="mr-2 w-5 h-5" :icon="icons.upgrade" />
    <p>Upgrade</p>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon } from "@iconify/vue";
import upgradeIcon from "@iconify-icons/feather/star";

export default defineComponent({
  name: "CUpgradeButton",
  components: {
    Icon,
  },
  setup() {
    return {
      icons: {
        upgrade: upgradeIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>