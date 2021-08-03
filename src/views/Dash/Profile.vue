<template>
  <section>
    <c-profile-info />

    <c-profile-auth />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CProfileInfo from "@/components/app/Dash/Profile/Info/CProfileInfo.vue";
import CProfileAuth from "@/components/app/Dash/Profile/CProfileAuth.vue";

export default defineComponent({
  name: "DashProfile",
  components: {
    CProfileInfo,
    CProfileAuth,
  },
});
</script>

<style lang="scss" scoped>
</style>