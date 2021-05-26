<template>
  <div
    ref="toast"
    class="toast absolute top-3 right-0 left-0 z-40 mx-auto bg-bg-dark max-w-3xl w-full h-12 rounded-lg flex items-center justify-center"
  >
    <p
      class="text-bg-light text-sm font-semibold opacity-90 overflow-ellipsis overflow-hidden whitespace-nowrap px-12"
    >
      {{ text }}
      <button
        class="w-7 h-7 text-bg-light absolute top-0 bottom-0 my-auto right-3 focus:outline-none focus:opacity-100 opacity-50 hover:opacity-100 cursor-pointer transition-opacity duration-200"
        @click="hideToast"
      >
        <Icon :icon="icons.close" class="w-full h-full" />
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { Icon } from "@iconify/vue";
import closeIcon from "@iconify-icons/feather/x";

export default defineComponent({
  name: "CToast",
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "This is some example text.",
    },
  },
  setup(_, { emit }) {
    const toast = ref(document.createElement("div"));

    const hideToast = () => {
      toast.value.classList.add("exit");
      emit("close");
      setTimeout(() => emit("slide-out"), 600);
    };

    return {
      toast,
      hideToast,
      icons: {
        close: closeIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes slide-in {
  to {
    transform: translateY(7rem);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(7rem);
  }

  to {
    transform: translateY(0rem);
  }
}

.toast {
  top: -6rem;
  animation: slide-in 0.6s ease;
  animation-fill-mode: forwards;

  &.exit {
    animation: slide-out 0.6s ease;
  }
}
</style>