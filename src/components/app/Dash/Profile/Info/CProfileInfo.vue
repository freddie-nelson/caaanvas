<template>
  <div class="flex">
    <div
      class="
        rounded-xl
        bg-accent-400
        text-bg-light
        font-bold
        max-w-xs
        flex
        justify-center
        items-center
        text-8xl
        w-60
        h-60
        select-none
      "
    >
      F
    </div>

    <div class="text-t-main ml-14 flex flex-col justify-center items-start flex-grow">
      <c-info-field name="Username" :value="'FreddieN'" />

      <c-info-field name="Email" :value="'freddie@caaanvas.com'" class="mt-4" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CInfoField from "./CInfoField.vue";

export default defineComponent({
  name: "CProfileCard",
  components: {
    CInfoField,
  },
});
</script>

<style lang="scss" scoped>
</style>