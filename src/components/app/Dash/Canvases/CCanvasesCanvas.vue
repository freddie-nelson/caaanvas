<template>
  <div class="relative rounded-2xl w-full h-72 max-w-md border-t-sub border-4 group">
    <div
      class="
        absolute
        w-full
        h-full
        bg-gradient-to-t
        from-t-sub
        via-transparent
        to-transparent
        rounded-md
        opacity-50
      "
    ></div>

    <button class="absolute left-5 bottom-5 text-2xl font-semibold text-t-main outline-none">
      {{ canvas.title }}
    </button>

    <!-- stats -->
    <div
      class="
        absolute
        bg-bg-dark
        rounded-lg
        w-auto
        flex
        text-bg-light
        transform
        scale-90
        origin-top-right
        right-3
        top-3
        opacity-0
        -translate-y-2
        transition-all
        duration-300
        group-hover:opacity-100
        stats-menu
      "
    >
      <div class="flex items-center p-3 opacity-60">
        <Icon class="w-5 h-5" :icon="icons.flag" />
        <p class="font-mono text-lg ml-2">
          {{ canvas.components.filter((c) => c.type === "flag").length }}
        </p>
      </div>

      <div class="flex items-center p-3 opacity-60">
        <Icon class="w-5 h-5" :icon="icons.component" />
        <p class="font-mono text-lg ml-2">{{ canvas.components.length }}</p>
      </div>

      <div class="flex items-center p-3 opacity-60">
        <Icon class="w-5 h-5" :icon="icons.lastViewed" />
        <p class="font-mono text-lg ml-2">Today</p>
      </div>
    </div>

    <!-- buttons -->
    <div
      class="
        absolute
        right-3
        bottom-3
        opacity-0
        group-hover:opacity-75
        transition-opacity
        duration-300
      "
    >
      <button class="relative p-3 rounded-lg outline-none mr-1.5" @click="favourite">
        <div
          class="
            opacity-0
            hover:opacity-15
            transition-opacity
            duration-300
            rounded-lg
            bg-primary-500
            w-full
            h-full
            left-0
            absolute
            top-0
          "
        ></div>

        <Icon class="w-6 h-6 text-primary-600" :icon="icons.favourite" />
      </button>

      <button
        class="
          p-3
          rounded-lg
          bg-danger-500 bg-opacity-0
          hover:bg-opacity-15
          transition-colors
          duration-300
          outline-none
        "
        @click="showDeleteModal = true"
      >
        <Icon class="w-6 h-6 text-danger-600" :icon="icons.delete" />
      </button>

      <c-modal v-if="showDeleteModal" class="flex flex-col items-center">
        <p class="text-bg-light text-lg font-medium font-mono text-center">
          Do you want to delete {{ canvas.title }}? <br />
          This is irreversible.
        </p>

        <div class="flex justify-around w-full mt-6">
          <c-button-outline @click="showDeleteModal = false">Cancel</c-button-outline>
          <c-button-danger @click="deleteCanvas">Delete</c-button-danger>
        </div>
      </c-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Canvas } from "@/store";

import CModal from "@/components/shared/Modal/CModal.vue";
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue";
import CButtonDanger from "@/components/shared/Button/CButtonDanger.vue";

import { Icon } from "@iconify/vue";
import flagIcon from "@iconify-icons/feather/flag";
import componentIcon from "@iconify-icons/feather/square";
import lastViewedIcon from "@iconify-icons/feather/calendar";
import favouriteIcon from "@iconify-icons/feather/star";
import deleteIcon from "@iconify-icons/feather/trash-2";

export default defineComponent({
  name: "CCanvasesCanvas",
  components: {
    Icon,
    CModal,
    CButtonOutline,
    CButtonDanger,
  },
  props: {
    canvas: {
      type: Object as () => Canvas,
      default() {
        return { title: "", components: [] };
      },
      valid(val: Canvas) {
        return val.title && val.components;
      },
    },
  },
  setup() {
    const favourite = () => {};

    const showDeleteModal = ref(false);
    const deleteCanvas = () => {
      showDeleteModal.value = false;
    };

    return {
      favourite,

      showDeleteModal,
      deleteCanvas,

      icons: {
        flag: flagIcon,
        component: componentIcon,
        lastViewed: lastViewedIcon,
        favourite: favouriteIcon,
        delete: deleteIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.group:hover .stats-menu {
  --tw-translate-y: 0;
}
</style>