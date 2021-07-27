<template>
  <c-toast-controller />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CToastController from "@/components/shared/Toast/CToastController.vue";

export default defineComponent({
  name: "App",
  components: {
    CToastController,
  },
});
</script>

<style lang="scss">
:root {
  --primary-100: theme("colors.primaryColor.100");
  --primary-200: theme("colors.primaryColor.200");
  --primary-300: theme("colors.primaryColor.300");
  --primary-400: theme("colors.primaryColor.400");
  --primary-500: theme("colors.primaryColor.500");
  --primary-600: theme("colors.primaryColor.600");
  --primary-700: theme("colors.primaryColor.700");
  --primary-800: theme("colors.primaryColor.800");
  --primary-900: theme("colors.primaryColor.900");

  --accent-100: theme("colors.accentColor.100");
  --accent-200: theme("colors.accentColor.200");
  --accent-300: theme("colors.accentColor.300");
  --accent-400: theme("colors.accentColor.400");
  --accent-500: theme("colors.accentColor.500");
  --accent-600: theme("colors.accentColor.600");
  --accent-700: theme("colors.accentColor.700");
  --accent-800: theme("colors.accentColor.800");
  --accent-900: theme("colors.accentColor.900");

  --bg-dark: theme("colors.coolGray.800");
  --bg-light: theme("colors.coolGray.50");
  --t-main: theme("colors.coolGray.900");
  --t-sub: theme("colors.coolGray.400");
  --b-light: theme("colors.coolGray.400");
  --b-dark: theme("colors.coolGray.600");
  --b-highlight: var(--primary-400);
  --input-focus: theme("colors.coolGray.700");
  --input-blur: theme("colors.coolGray.500");
  --input-light: theme("colors.coolGray.300");
}

:root.dark {
  --primary-100: theme("colors.primaryColorDark.100");
  --primary-200: theme("colors.primaryColorDark.200");
  --primary-300: theme("colors.primaryColorDark.300");
  --primary-400: theme("colors.primaryColorDark.400");
  --primary-500: theme("colors.primaryColorDark.500");
  --primary-600: theme("colors.primaryColorDark.600");
  --primary-700: theme("colors.primaryColorDark.700");
  --primary-800: theme("colors.primaryColorDark.800");
  --primary-900: theme("colors.primaryColorDark.900");

  --accent-100: theme("colors.accentColorDark.100");
  --accent-200: theme("colors.accentColorDark.200");
  --accent-300: theme("colors.accentColorDark.300");
  --accent-400: theme("colors.accentColorDark.400");
  --accent-500: theme("colors.accentColorDark.500");
  --accent-600: theme("colors.accentColorDark.600");
  --accent-700: theme("colors.accentColorDark.700");
  --accent-800: theme("colors.accentColorDark.800");
  --accent-900: theme("colors.accentColorDark.900");

  --bg-dark: theme("colors.warmGray.50");
  --bg-light: theme("colors.warmGray.900");
  --t-main: theme("colors.warmGray.200");
  --t-sub: theme("colors.warmGray.500");
  --b-light: theme("colors.warmGray.500");
  --b-dark: theme("colors.warmGray.300");
  --b-highlight: var(--primary-500);
  --input-focus: theme("colors.warmGray.200");
  --input-blur: theme("colors.warmGray.400");
  --input-light: theme("colors.warmGray.800");
}

body {
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
