<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      rounded-2xl
      border-4
      p-14
      w-full
      max-w-md
      bg-bg-light
    "
    :class="{ [`border-${borderColor}`]: true }"
  >
    <Icon class="w-14 h-14" :class="{ [`text-${borderColor}`]: true }" :icon="icon" />

    <ul
      class="list-none flex flex-col items-center mt-9 font-semibold text-xl"
      :class="{ [`text-${borderColor}`]: true }"
    >
      <li class="py-2 flex items-center" v-for="(feature, i) in features" :key="i">
        <!-- <div
          v-if="feature"
          class="w-7 h-7 mr-2.5 rounded-full"
          :class="{ [`bg-${borderColor}`]: true }"
        >
          <Icon class="w-full h-full p-1 text-bg-light" :icon="icons.tick" />
        </div> -->
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Icon } from "@iconify/vue";
import freeIcon from "@iconify-icons/feather/edit-2";
import tickIcon from "@iconify-icons/feather/check";

export default defineComponent({
  name: "CPlansPlan",
  components: {
    Icon,
  },
  props: {
    borderColor: {
      type: String,
      default: "t-sub",
    },
    icon: {
      type: Object,
      default: freeIcon,
    },
    price: {
      type: String,
      default: "0",
    },
    features: {
      type: Array as () => String[],
      default: ["5 Canvases", "100 items per canvas", "", "", ""],
    },
  },
  setup() {
    return {
      icons: {
        tick: tickIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>