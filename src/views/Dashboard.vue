<template>
  <main class="bg-bg-light w-full h-full">
    <c-nav />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CNav from "@/components/app/Dashboard/Nav/CNav.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    CNav,
  },
});
</script>

<style lang="scss" scoped>
</style>