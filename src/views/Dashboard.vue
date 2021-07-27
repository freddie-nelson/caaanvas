<template>
  <main class="bg-bg-light w-full h-full">
    <c-nav-bar />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CNavBar from "@/components/app/Dashboard/Nav/CNavBar.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    CNavBar,
  },
});
</script>

<style lang="scss" scoped>
</style>