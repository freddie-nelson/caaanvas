<template>
  <section>
    <c-profile-info />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CProfileInfo from "@/components/app/Dash/Profile/Info/CProfileInfo.vue";

export default defineComponent({
  name: "DashProfile",
  components: {
    CProfileInfo,
  },
});
</script>

<style lang="scss" scoped>
</style>