<template>
  <main class="flex flex-col justify-center items-center w-full h-full bg-bg-light">
    <c-gradient-heading>caaanvas.</c-gradient-heading>
    <c-sub-heading>An infinite canvas to store all your ideas and inspiration</c-sub-heading>

    <div class="mt-7">
      <c-button-outline class="mr-12">Sign in</c-button-outline>
      <c-button>Get Started</c-button>
    </div>
  </main>

  <section class="links absolute flex w-48 h-12 justify-between"></section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import CGradientHeading from "@/components/shared/CGradientHeading.vue"
import CSubHeading from "@/components/shared/CSubHeading.vue"
import CButton from "@/components/shared/Button/CButton.vue"
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue"

export default defineComponent({
  name: "Home",
  components: {
    CGradientHeading,
    CSubHeading,
    CButton,
    CButtonOutline,
  },
})
</script>

<style lang="scss" scoped>
.links {
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>