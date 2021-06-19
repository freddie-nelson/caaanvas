<template>
  <c-tool :open="open" @close="$emit('close')">
    <template v-slot:main></template>

    <template v-slot:open></template>
  </c-tool>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";

interface Text {
  title: string;
  body: string;
}

export default defineComponent({
  name: "CToolDraw",
  components: {
    CTool,
  },
  props: {
    data: {
      type: Object as () => Text,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>