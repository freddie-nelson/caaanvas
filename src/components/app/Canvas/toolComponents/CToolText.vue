<template>
  <div class="bg-bg-light border-b-light border-2 border-solid p-5 rounded-lg">
    <h1 class="text-2xl font-medium" style="min-width: 20rem">
      {{ data.title }}
      <p v-if="!data.title" class="opacity-40">Your Amazing Title</p>
    </h1>

    <p
      class="max-w-2xl text-base pt-2 overflow-hidden"
      style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical"
    >
      <span
        v-if="!data.body"
        class="opacity-40"
        style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ducimus omnis dicta
        fugit, repudiandae perspiciatis porro vitae saepe quo ex illum tempore consectetur quos et
        aliquid iusto iste alias eius.</span
      >
    </p>

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
        <div class="bg-bg-light p-8 rounded-lg flex w-full max-w-4xl relative">
          <button
            class="
              w-7
              h-7
              text-t-main
              absolute
              right-8
              hover:text-primary-600
              focus:text-primary-600
              focus:outline-none
              transition-colors
              duration-200
            "
            @click="$emit('close')"
          >
            <Icon class="w-full h-full" :icon="icons.close" />
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon } from "@iconify/vue";
import closeIcon from "@iconify-icons/feather/x";

interface Text {
  title: string;
  body: string;
}

export default defineComponent({
  name: "CToolText",
  components: {
    Icon,
  },
  props: {
    data: {
      type: Object as () => Text,
      required: true,
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