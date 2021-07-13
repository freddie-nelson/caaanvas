<template>
  <c-canvas-circles
    fadeOut
    useWindow
    :brushSize="brushSize"
    :brushColor="brushColor"
    @paint="updateHue"
    class="absolute w-full h-full"
    style="top: 0; left: 0"
  />

  <main
    class="
      absolute
      flex flex-col
      justify-center
      items-center
      w-full
      h-full
      select-none
      overflow-x-hidden
    "
  >
    <c-gradient-heading style="padding-bottom: 0">caaanvas.</c-gradient-heading>
    <c-sub-heading class="text-center"
      >An infinite canvas to store all of your ideas and inspiration</c-sub-heading
    >

    <div class="mt-7 w-full flex justify-between" style="max-width: 21.5rem">
      <c-button-outline class="mr-4" @click="$router.push({ name: 'Login' })">
        Sign in
      </c-button-outline>
      <c-button @click="$router.push({ name: 'Canvas' })">Get Started</c-button>
    </div>
  </main>

  <section class="watermark absolute flex w-auto h-auto justify-between items-center">
    <p class="text-t-sub font-medium">
      made with
      <icon
        class="
          heart-icon
          w-4
          h-4
          inline
          text-primary-600
          mb-0.5
          hover:text-accent-600
          transition-colors
        "
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

  <section class="links absolute flex w-36 h-8 justify-between items-center flex-row-reverse">
    <a
      class="text-t-sub hover:text-t-main transition-colors duration-300"
      href="https://github.com/freddie-nelson/caaanvas"
      target="_blank"
      rel="noopener"
      ><icon class="h-8 w-8" :icon="icons.github"
    /></a>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CSubHeading from "@/components/shared/Heading/CSubHeading.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue";
import CCanvasCircles from "@/components/shared/Canvas/CCanvasCircles.vue";

import { Icon } from "@iconify/vue";
import githubIcon from "@iconify-icons/feather/github";
import heartIcon from "@iconify-icons/feather/heart";

export default defineComponent({
  name: "Home",
  components: {
    CGradientHeading,
    CSubHeading,
    CButton,
    CButtonOutline,
    CCanvasCircles,
    Icon,
  },
  setup() {
    const hue = ref(250);
    let diff = 1;
    const updateHue = () => {
      hue.value += diff;
      if (hue.value < 250 || hue.value > 340) diff *= -1;
    };

    const brushColor = computed(() => `hsl(${hue.value}, 83%, 58%)`);

    const store = useStore();

    onMounted(() => {
      if (localStorage.getItem("visited")) return;

      localStorage.setItem("visited", "true");

      setTimeout(
        () =>
          store.commit("ADD_TOAST", {
            text: "👋 Welcome to caaanvas, we hope you enjoy your stay!",
          }),
        600,
      );
    });

    onUnmounted(() => {
      const btn = document.getElementById("closeToastBtn");
      if (!btn) return;

      btn.click();
    });

    return {
      icons: {
        github: githubIcon,
        heart: heartIcon,
      },
      brushColor,
      updateHue,
      brushSize: Math.max(window.innerWidth / 30, 14),
    };
  },
});
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