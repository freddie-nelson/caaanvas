<template>
  <section class="mt-10 pl-10">
    <h2 class="text-4xl font-bold">{{ title }}</h2>

    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CSettingsGroup",
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>