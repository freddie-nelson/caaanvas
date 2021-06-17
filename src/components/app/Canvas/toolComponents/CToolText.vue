<template>
  <div v-if="!isOpen" class="bg-bg-light border-b-light border-2 border-solid p-5 rounded-lg">
    <h1 class="text-2xl font-medium" style="min-width: 20rem">
      {{ data.title }}
      <p v-if="!data.title" class="opacity-40">Your Amazing Title</p>
    </h1>

    <p
      class="max-w-2xl text-base pt-2 overflow-hidden"
      style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical"
    >
      <span
        v-if="!data.body"
        class="opacity-40"
        style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ducimus omnis dicta
        fugit, repudiandae perspiciatis porro vitae saepe quo ex illum tempore consectetur quos et
        aliquid iusto iste alias eius.</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Text {
  title: string;
  body: string;
}

export default defineComponent({
  name: "CToolText",
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