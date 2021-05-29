<template>
  <c-toast-controller />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

import CToastController from "@/components/shared/Toast/CToastController.vue";

export default defineComponent({
  name: "App",
  components: {
    CToastController,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      setTimeout(
        () =>
          store.commit("ADD_TOAST", {
            text: "👋 Welcome to caaanvas, we hope you enjoy your stay!",
          }),
        1000,
      );
    });
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
