<template>
  <section>
    <c-profile-info />

    <c-profile-auth />

    <c-profile-management />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CProfileInfo from "@/components/app/Dash/Profile/Info/CProfileInfo.vue";
import CProfileAuth from "@/components/app/Dash/Profile/CProfileAuth.vue";
import CProfileManagement from "@/components/app/Dash/Profile/CProfileManagement.vue";

export default defineComponent({
  name: "DashProfile",
  components: {
    CProfileInfo,
    CProfileAuth,
    CProfileManagement,
  },
});
</script>

<style lang="scss" scoped>
</style>