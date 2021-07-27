<template>
  <div
    class="
      relative
      rounded-md
      font-bold
      text-lg
      h-10
      w-full
      max-w-md
      mx-3
      flex
      items-center
      p-2
      px-3
      justify-center
      bg-input-light
    "
  >
    <button class="focus:outline-none mr-3 text-t-main" @click="search">
      <Icon :icon="icons.search" />
    </button>

    <input
      type="text"
      class="w-full h-full bg-transparent font-mono text-sm text-t-main focus:outline-none"
      placeholder="Search your canvases..."
      @keyup.enter="search"
      v-model="searchTerm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { Icon } from "@iconify/vue";
import searchIcon from "@iconify-icons/feather/search";

export default defineComponent({
  name: "CNavSearch",
  components: {
    Icon,
  },
  setup() {
    const searchTerm = ref("");
    const search = () => {
      console.log(searchTerm.value);
    };

    return {
      searchTerm,
      search,

      icons: {
        search: searchIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>