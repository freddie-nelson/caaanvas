<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      rounded-2xl
      border-8
      p-14
      w-full
      max-w-md
      bg-bg-light
      m-auto
      text-t-main
    "
    :class="{ [`border-${borderColor}`]: true }"
  >
    <h2 class="text-5xl font-bold">{{ name }}</h2>

    <div class="my-6 flex flex-col items-center">
      <c-gradient-heading direction="t" :size="7" noscale>${{ price }}</c-gradient-heading>
      <p class="-mt-1 text-xl font-bold">per month</p>
    </div>

    <ul class="list-none mb-8 font-bold text-2xl" :class="{ [`text-${borderColor}`]: true }">
      <li class="py-3 flex items-center" v-for="(feature, i) in features" :key="i">
        <div>
          <Icon v-if="feature" class="w-9 h-9 mr-3" :icon="icons.tick" />
        </div>

        <p>{{ feature }}</p>
      </li>
    </ul>

    <c-button-outline v-if="!filledBtn" class="w-full font-bold">
      {{ buttonText }}
    </c-button-outline>

    <c-button v-else class="w-full font-bold">
      {{ buttonText }}
    </c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue";

import { Icon } from "@iconify/vue";
import tickIcon from "@iconify-icons/feather/check-circle";

export default defineComponent({
  name: "CPlansPlan",
  components: {
    Icon,
    CGradientHeading,
    CButton,
    CButtonOutline,
  },
  props: {
    name: {
      type: String,
      default: "Standard",
    },
    borderColor: {
      type: String,
      default: "t-sub",
    },
    price: {
      type: String,
      default: "0",
    },
    features: {
      type: Array as () => String[],
      default: ["5 Canvases", "50 items per canvas"],
    },
    filledBtn: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "Subscribe",
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