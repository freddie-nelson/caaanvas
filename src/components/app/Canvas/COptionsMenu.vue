<template>
  <div
    v-show="isOptionsVisible"
    ref="optionsElement"
    class="absolute top-0 left-0 w-52 h-12 bg-bg-dark rounded-md"
    :style="{
      transform: `scale(${$store.state.canvas.zoom.scale}) translate(${optionsPos.x}px, ${optionsPos.y}px)`,
    }"
  ></div>
</template>

<script lang="ts">
import useComponentEvent from "@/utils/useComponentEvent";
import { defineComponent, ref, reactive, computed, watch } from "vue";

import moveIcon from "@iconify-icons/feather/move";
import openIcon from "@iconify-icons/feather/edit-2";
import deleteIcon from "@iconify-icons/feather/trash";
import { useStore } from "@/store";

export default defineComponent({
  name: "COptionsMenu",
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    target: {
      type: Object as () => Element,
    },
  },
  setup(props) {
    const store = useStore();

    const optionsElement = ref(document.createElement("div"));
    const isOptionsVisible = ref(false);
    let optionsTarget: Element;
    const optionsPos = reactive({
      x: 0,
      y: 0,
    });

    const observer = new MutationObserver((entries) => {
      const box = (entries[0].target as Element).getBoundingClientRect();
      optionsPos.x = box.x / store.state.canvas.zoom.scale;
      optionsPos.y = (box.y + box.height) / store.state.canvas.zoom.scale + 7;
    });

    const showOptions = (target: Element) => {
      observer.disconnect();

      isOptionsVisible.value = true;
      optionsTarget = target;
      observer.observe(target, { attributes: true });

      const box = target.getBoundingClientRect();
      optionsPos.x = box.x / store.state.canvas.zoom.scale;
      optionsPos.y = (box.y + box.height) / store.state.canvas.zoom.scale + 7;
    };

    watch(
      computed(() => props.show),
      () => {
        if (props.target) showOptions(props.target);
      },
    );

    useComponentEvent(document.body, "click", (event) => {
      if (!optionsTarget) return;
      const e = <MouseEvent>event;

      const containsTarget =
        optionsTarget.compareDocumentPosition(e.target as Node) &
        Node.DOCUMENT_POSITION_CONTAINED_BY;

      if (e.target !== optionsTarget && e.target !== optionsElement.value && !containsTarget)
        isOptionsVisible.value = false;
    });

    return {
      optionsElement,
      isOptionsVisible,
      optionsPos,
      showOptions,

      icons: {
        move: moveIcon,
        open: openIcon,
        delete: deleteIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>