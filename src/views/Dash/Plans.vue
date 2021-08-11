<template>
  <section>
    <div class="grid grid-cols-3 gap-8 mt-10">
      <c-plans-plan name="Starter" price="0" :features="['5 Canvases', '50 items per canvas']" />

      <c-plans-plan
        name="Premium"
        price="5"
        :features="['20 Canvases', '200 items per canvas', 'More Themes']"
        borderColor="primary-500"
      />

      <c-plans-plan
        name="Ultimate"
        price="10"
        :features="['100 Canvases', '1000 items per canvas', 'More Themes', 'Offline Access']"
        borderColor="accent-500"
        filledBtn
      />
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