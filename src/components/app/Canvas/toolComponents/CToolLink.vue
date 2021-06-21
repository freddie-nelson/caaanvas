<template>
  <c-tool style="padding: 0rem" :open="open" @close="$emit('close')">
    <template v-slot:main>
      <div
        class="
          w-96
          h-60
          bg-gray-400
          flex
          overflow-hidden
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-white
        "
      >
        <div class="bg-bg-light w-full h-16 self-end p-3 flex items-center">
          <div class="flex flex-col">
            <p class="font-semibold">
              {{ data.name || "Site Name" }}
            </p>
            <a :href="data.url" target="_blank" class="text-xs opacity-60">
              {{ data.url || "http://www.example.com" }}
            </a>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:open></template>
  </c-tool>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";

interface Text {
  name: string;
  url: string;
}

export default defineComponent({
  name: "CToolLink",
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