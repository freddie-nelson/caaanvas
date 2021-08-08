<template>
  <section>
    <c-gradient-heading style="width: 5ch" :size="6" noscale>Plans</c-gradient-heading>

    <div class="grid grid-cols-3 gap-10 mt-10">
      <c-plans-plan />
      <c-plans-plan class="transform scale-110 z-10" borderColor="accent-500" />
      <c-plans-plan borderColor="primary-500" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CPlansPlan from "@/components/app/Dash/Plans/CPlansPlan.vue";

export default defineComponent({
  name: "DashPlans",
  components: { CGradientHeading, CPlansPlan },
});
</script>

<style lang="scss" scoped>
</style>