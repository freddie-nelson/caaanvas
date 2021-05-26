<template>
  <h1 class="font-bold text-7xl md:text-9xl bg-gradient-to-r from-primary-600 to-accent-500">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CGradientHeading",
  components: {},
});
</script>

<style lang="scss" scoped>
h1 {
  background-clip: text;
  color: transparent;
}
</style>