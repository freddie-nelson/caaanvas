<template>
  <div class="text-t-main">
    <section v-if="favourites.lenght > 0" class="mb-24">
      <h1 class="text-4xl font-bold">Favourites</h1>
    </section>

    <section v-if="recent.lenght > 0" class="mb-24">
      <h1 class="text-4xl font-bold">Recently Viewed</h1>
    </section>

    <section>
      <div class="flex items-center">
        <h1 class="text-4xl font-bold mr-10">Your Canvases</h1>
        <c-upgrade-button />
      </div>

      <c-canvases-list />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CUpgradeButton from "@/components/app/CUpgradeButton.vue";
import CCanvasesList from "@/components/app/Dash/Canvases/CCanvasesList.vue";

export default defineComponent({
  name: "DashCanvases",
  components: {
    CUpgradeButton,
    CCanvasesList,
  },
  setup() {
    const favourites = ref([]);
    const recent = ref([]);
    const all = ref([]);

    return {
      favourites,
      recent,
      all,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>