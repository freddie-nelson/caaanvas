<template>
  <button
    nav-account-dropdown
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
      group
      relative
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
        opacity-10
        group-hover:opacity-20
        transition-opacity
        duration-300
      "
      :class="bgClass"
    ></div>

    <Icon class="ml-auto mr-2 w-4 h-4" :class="textClass" :icon="icon" />

    <p
      class="whitespace-nowrap overflow-hidden overflow-ellipsis mr-auto"
      :class="textClass"
      style="max-width: 18ch"
    >
      <slot></slot>
    </p>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "CAccountButton",
  components: {
    Icon,
  },
  props: {
    bgClass: {
      type: String,
      default: "",
    },
    textClass: {
      type: String,
      default: "",
    },
    icon: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>