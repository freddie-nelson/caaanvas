<template>
  <div v-if="!isOpen" class="bg-bg-light border-b-light border-2 border-solid p-5 rounded-md">
    <h1 class="text-xl" style="min-width: 12rem">{{ data.title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Text {
  title: string;
  body: string;
}

export default defineComponent({
  name: "CToolDraw",
  components: {},
  props: {
    data: {
      type: Object as () => Text,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>