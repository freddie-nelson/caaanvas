<template>
  <c-tool :open="open" @close-btn="$emit('close')">
    <template v-slot:main>
      <div
        linkBackground="true"
        class="w-96 h-60 bg-b-light flex overflow-hidden"
        :style="{ backgroundImage: `url(${data.image})` }"
        @dblclick="handleClick"
      >
        <div
          class="bg-bg-light w-full h-16 self-end p-3 flex items-center justify-between text-t-main"
        >
          <div class="flex flex-col">
            <p class="font-semibold">
              {{ data.name || "Site Name" }}
            </p>
            <a :href="data.url" target="_blank" class="text-xs opacity-60">
              {{ data.url || "http://www.example.com" }}
            </a>
          </div>

          <a
            class="w-6 h-6 mr-2.5 transition-colors hover:text-primary-600 duration-200"
            :href="data.url"
            target="_blank"
          >
            <Icon class="w-full h-full" :icon="icons.link" />
          </a>
        </div>
      </div>
    </template>

    <template v-slot:open>
      <label for="url" class="font-medium pb-1 text-lg">Link / URL</label>
      <input
        class="
          text-xl
          font-medium
          w-full
          p-3
          rounded-md
          bg-transparent
          border-2 border-b-light
          transition-colors
          focus:border-b-dark
          focus:outline-none
        "
        placeholder="http://www.example.com"
        type="text"
        name="url"
        v-model="data.url"
      />
    </template>
  </c-tool>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";

import { Icon } from "@iconify/vue";
import linkIcon from "@iconify-icons/feather/external-link";

interface Link {
  name: string;
  url: string;
  image: string;
}

export default defineComponent({
  name: "CToolLink",
  components: {
    CTool,
    Icon,
  },
  props: {
    data: {
      type: Object as () => Link,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const handleClick = ({ target }: { target: Element }) => {
      if (target.getAttribute("linkBackground") && props.data.url) {
        window.open(props.data.url, "_blank")?.focus();
      }
    };

    return {
      handleClick,
      icons: {
        link: linkIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>