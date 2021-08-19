<template>
  <div class="mt-8 pl-7">
    <h3 class="text-2xl font-bold mb-4">{{ name }}</h3>

    <div class="pl-4">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CSettingsSetting",
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>