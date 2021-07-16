<template>
  <c-button-dropdown
    @updateShow="showFlagsMenu = $event"
    :forceClose="forceCloseMenu"
    tag="flags-dropdown"
    class="
      font-mono
      text-sm
      my-auto
      mx-3
      p-2
      focus:outline-none
      flex
      justify-center
      items-center
      text-bg-light
      hover:text-primary-500
      transition-colors
      duration-300
    "
  >
    <Icon class="w-4 h-4" :icon="icons.pin" />

    <template v-slot:menu>
      <button
        v-for="f in flags"
        :key="f.data.name"
        flags-dropdown
        class="p-2 text-bg-light flex items-center focus:outline-none rounded-sm my-2"
        @click="$store.commit('SET_FLAG_TO_FOCUS', f), (forceCloseMenu = !forceCloseMenu)"
        :style="{ backgroundColor: `${f.data.color}25` }"
      >
        <p
          class="whitespace-nowrap overflow-hidden overflow-ellipsis"
          style="max-width: 18ch"
          :style="{ color: f.data.color }"
        >
          {{ f.data.name }}
        </p>
      </button>
    </template>
  </c-button-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";

import CButtonDropdown from "@/components/shared/Button/CButtonDropdown.vue";

import { Icon } from "@iconify/vue";
import pinIcon from "@iconify-icons/feather/map-pin";

export default defineComponent({
  name: "CFlagsMenu",
  components: {
    CButtonDropdown,
    Icon,
  },
  setup() {
    const store = useStore();

    const showFlagsMenu = ref(false);
    const forceCloseMenu = ref(false);

    const flags = computed(() => {
      return store.state.canvas.current.components.filter((c) => c.type === "flag");
    });

    return {
      showFlagsMenu,
      forceCloseMenu,

      flags,

      icons: {
        pin: pinIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>