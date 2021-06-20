<template>
  <c-tool :open="open" @close="$emit('close')">
    <template v-slot:main>
      <h1 class="text-2xl font-medium" style="min-width: 20rem">
        {{ data.title }}
        <p v-if="!data.title" class="opacity-40">Your Amazing Title</p>
      </h1>

      <p
        class="max-w-2xl text-base overflow-hidden"
        :class="{ 'pt-2': data.body, 'whitespace-pre-wrap': data.body }"
        style="display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical"
      >
        {{ data.body }}
        <span
          v-if="!data.body && !data.title"
          class="opacity-40 pt-2"
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ducimus omnis dicta
          fugit, repudiandae perspiciatis porro vitae saepe quo ex illum tempore consectetur quos et
          aliquid iusto iste alias eius.
        </span>
      </p>
    </template>

    <template v-slot:open>
      <input
        class="
          text-2xl
          font-medium
          w-full
          p-2
          rounded-md
          bg-transparent
          border-2 border-transparent
          focus:border-b-dark
          focus:outline-none
        "
        placeholder="Your Amazing Title"
        type="text"
        name="title"
        v-model="data.title"
      />

      <textarea
        class="
          w-full
          mt-2
          p-2
          rounded-md
          bg-transparent
          border-2 border-transparent
          focus:border-b-dark
          focus:outline-none
          resize-none
          h-full
        "
        rows="20"
        placeholder="Enter body text here..."
        name="body"
        v-model="data.body"
      />
    </template>
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
  name: "CToolText",
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