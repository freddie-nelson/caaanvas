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
body {
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
