<template>
  <c-renderer class="w-full h-full bg-bg-light" />

  <c-toolbar :tools="$store.state.canvas.tools" />

  <div class="absolute top-5 right-5 flex rounded-md bg-bg-dark z-10" ui-element>
    <c-zoom-controls />
    <c-flags-menu />
  </div>

  <div class="absolute bottom-5 right-5 flex rounded-md bg-bg-dark z-10" ui-element>
    <c-nav-menu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CToolbar from "@/components/app/Canvas/CToolbar.vue";
import CRenderer from "@/components/app/Canvas/CRenderer.vue";
import CZoomControls from "@/components/app/Canvas/CZoomControls.vue";
import CFlagsMenu from "@/components/app/Canvas/CFlagsMenu.vue";
import CNavMenu from "@/components/app/Canvas/CNavMenu.vue";

import { Icon } from "@iconify/vue";
import navIcon from "@iconify-icons/feather/menu";

export default defineComponent({
  name: "Canvas",
  components: {
    CToolbar,
    CRenderer,
    CZoomControls,
    CFlagsMenu,
    CNavMenu,
    Icon,
  },
  setup() {
    return {
      icons: {
        nav: navIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>