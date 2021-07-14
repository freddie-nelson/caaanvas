<template>
  <div
    class="overflow-hidden bg-bg-light border-b-light border-2 border-solid rounded-lg text-t-main"
  >
    <slot name="main"></slot>

    <teleport to="body">
      <div
        v-if="open"
        class="
          absolute
          top-0
          bottom-0
          z-10
          bg-black bg-opacity-50
          w-full
          h-full
          flex
          justify-center
          items-center
        "
      >
        <div class="bg-bg-light p-10 rounded-lg flex flex-col relative" :class="modalClasses">
          <button
            class="
              w-7
              h-7
              text-t-main
              absolute
              right-3.5
              top-3.5
              hover:text-primary-600
              focus:text-primary-600
              focus:outline-none
              transition-colors
              duration-200
            "
            @click="$emit('close-btn')"
          >
            <Icon class="w-full h-full" :icon="icons.close" />
          </button>

          <slot name="open"></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon } from "@iconify/vue";
import closeIcon from "@iconify-icons/feather/x";

export default defineComponent({
  name: "CTool",
  components: {
    Icon,
  },
  props: {
    modalClasses: {
      type: String,
      default: "w-full max-w-4xl",
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      icons: {
        close: closeIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>