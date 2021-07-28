<template>
  <main class="bg-bg-light w-full h-full">
    <c-nav />

    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CNav from "@/components/app/Dash/Nav/CNav.vue";

export default defineComponent({
  name: "Dash",
  components: {
    CNav,
  },
});
</script>

<style lang="scss" scoped>
</style>