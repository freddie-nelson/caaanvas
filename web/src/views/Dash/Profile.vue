<template>
  <section>
    <c-profile-info />

    <c-profile-plan />

    <c-profile-auth />

    <c-profile-management />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CProfileInfo from "@/components/app/Dash/Profile/Info/CProfileInfo.vue";
import CProfileAuth from "@/components/app/Dash/Profile/CProfileAuth.vue";
import CProfileManagement from "@/components/app/Dash/Profile/CProfileManagement.vue";
import CProfilePlan from "@/components/app/Dash/Profile/CProfilePlan.vue";

export default defineComponent({
  name: "DashProfile",
  components: {
    CProfileInfo,
    CProfileAuth,
    CProfileManagement,
    CProfilePlan,
  },
});
</script>

<style lang="scss" scoped>
</style>