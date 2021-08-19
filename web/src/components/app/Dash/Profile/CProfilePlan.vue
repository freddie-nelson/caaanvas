<template>
  <section class="text-t-main mt-12">
    <h1 class="text-3xl font-bold mb-5">Subscription Plan</h1>

    <div class="flex items-center">
      <p class="text-xl font-bold mr-12 transform scale-110 origin-left text-primary-500">
        Starter
        <span class="ml-0.5 text-base text-t-sub">(0$/month)</span>
      </p>
      <c-button @click="$router.push({ name: 'DashPlans' })">Change Plan</c-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CButton from "@/components/shared/Button/CButton.vue";

export default defineComponent({
  name: "CProfilePlan",
  components: { CButton },
});
</script>

<style lang="scss" scoped>
</style>