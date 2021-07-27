<template>
  <nav class="px-6 h-20 w-full relative flex items-center justify-between">
    <div class="absolute left-0 -bottom-0.5 w-full h-0.5 opacity-20 bg-bg-dark"></div>

    <router-link to="/">
      <c-gradient-heading :size="3" noscale style="padding-bottom: 0">caaanvas</c-gradient-heading>
    </router-link>

    <c-nav-search />

    <c-nav-account />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CNavAccount from "./Account/CNavAccount.vue";
import CNavSearch from "./CNavSearch.vue";

export default defineComponent({
  name: "CNav",
  components: {
    CGradientHeading,
    CNavAccount,
    CNavSearch,
  },
});
</script>

<style lang="scss" scoped>
.button {
  padding: 0 1.4rem;
}
</style>