<template>
  <div class="flex justify-between w-full">
    <div>
      <p class="opacity-50 text-sm font-medium mb-0.5">{{ name }}</p>
      <p class="text-xl font-semibold">{{ value }}</p>
    </div>

    <c-button class="edit-btn self-end text-sm">Edit</c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CButton from "@/components/shared/Button/CButton.vue";

export default defineComponent({
  name: "CInfoField",
  components: {
    CButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.edit-btn {
  height: unset;
  padding: 0.6rem 1rem;
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}
</style>