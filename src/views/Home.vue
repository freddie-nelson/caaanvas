<template>
  <main class="flex flex-col justify-center items-center w-full h-full bg-bg-light select-none">
    <c-gradient-heading>caaanvas.</c-gradient-heading>
    <c-sub-heading>An infinite canvas to store all of your ideas and inspiration</c-sub-heading>

    <div class="mt-7">
      <c-button-outline class="mr-12">Sign in</c-button-outline>
      <c-button>Get Started</c-button>
    </div>
  </main>

  <section class="links absolute flex w-36 h-8 justify-between items-center flex-row-reverse">
    <a
      class="text-t-sub hover:text-t-main transition-colors duration-300"
      href="https://github.com/freddie-nelson/caaanvas"
      target="_blank"
      rel="noopener"
      ><icon class="h-8 w-8" :icon="icons.github"
    /></a>
  </section>

  <section class="watermark absolute flex w-auto h-auto justify-between items-center">
    <p class="text-t-sub font-medium">
      made with
      <icon
        class="heart-icon w-4 h-4 inline text-primary-600 mb-0.5 hover:text-accent-600 transition-colors"
        :icon="icons.heart"
      />
      by
      <a
        href="https://freddienelson.co.uk/"
        target="_blank"
        rel="noopener"
        class="underline hover:text-t-main transition-colors"
        >Freddie</a
      >
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue"
import CSubHeading from "@/components/shared/Heading/CSubHeading.vue"
import CButton from "@/components/shared/Button/CButton.vue"
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue"

import { Icon } from "@iconify/vue"
import githubIcon from "@iconify-icons/feather/github"
import heartIcon from "@iconify-icons/feather/heart"

export default defineComponent({
  name: "Home",
  components: {
    CGradientHeading,
    CSubHeading,
    CButton,
    CButtonOutline,
    Icon,
  },
  setup() {
    return {
      icons: {
        github: githubIcon,
        heart: heartIcon,
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.links {
  bottom: 0.8rem;
  right: 1rem;
}

.watermark {
  bottom: 0.8rem;
  left: 1rem;
}
</style>

<style lang="scss">
.heart-icon g {
  fill: currentColor;
}
</style>