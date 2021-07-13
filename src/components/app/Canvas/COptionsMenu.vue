<template>
  <div
    ui-element
    v-show="isOptionsVisible"
    ref="optionsElement"
    class="absolute top-0 left-0 bg-bg-dark rounded-md text-bg-light z-10"
    :style="{
      transform: `scale(${$store.state.canvas.zoom.scale}) translate(${optionsPos.x}px, ${optionsPos.y}px)`,
    }"
  >
    <button
      class="
        w-12
        h-12
        focus:outline-none
        p-3
        opacity-50
        hover:opacity-100
        transition-opacity
        duration-150
        focus:text-accent-500
        focus:opacity-100
      "
      style="transition-property: opacity, color"
      @mousedown="$emit('move')"
    >
      <Icon class="w-full h-full" :icon="icons.move" />
    </button>
    <button
      class="
        w-12
        h-12
        focus:outline-none
        p-3
        opacity-50
        hover:opacity-100
        transition-opacity
        duration-150
        focus:text-accent-500
        focus:opacity-100
      "
      style="transition-property: opacity, color"
      @click="$emit('open')"
    >
      <Icon class="w-full h-full" :icon="icons.open" />
    </button>
    <button
      class="
        w-12
        h-12
        focus:outline-none
        p-3
        opacity-50
        hover:opacity-100
        duration-150
        transition-opacity
        focus:text-accent-500
        focus:opacity-100
      "
      @click="$emit('delete')"
    >
      <Icon class="w-full h-full" :icon="icons.delete" />
    </button>
  </div>
</template>

<script lang="ts">
import useComponentEvent from "@/utils/useComponentEvent";
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useStore } from "@/store";

import { Icon } from "@iconify/vue";
import moveIcon from "@iconify-icons/feather/move";
import openIcon from "@iconify-icons/feather/edit-2";
import deleteIcon from "@iconify-icons/feather/trash";

export default defineComponent({
  name: "COptionsMenu",
  components: {
    Icon,
  },
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

    const updateMenuPosition = (target: Element) => {
      const box = target.getBoundingClientRect();
      optionsPos.x = box.x / store.state.canvas.zoom.scale;
      optionsPos.y = (box.y + box.height) / store.state.canvas.zoom.scale + 7;
    };

    const observer = new MutationObserver((entries) => {
      updateMenuPosition(<Element>entries[0].target);
    });

    watch(
      computed(() => props.target),
      (target, oldTarget) => {
        if (
          target === undefined ||
          !(target.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_CONTAINS) ||
          target === oldTarget
        )
          return;

        observer.disconnect();

        optionsTarget = target;
        updateMenuPosition(target);
        observer.observe(target, { attributes: true });
      },
    );

    const showOptions = (target: Element) => {
      isOptionsVisible.value = true;
      optionsTarget = target;
      updateMenuPosition(target);
    };

    watch(
      computed(() => props.show),
      () => {
        if (props.target) showOptions(props.target);
        else isOptionsVisible.value = false;
      },
    );

    useComponentEvent(document.body, "click", (event) => {
      if (!optionsTarget) return;
      const e = <MouseEvent>event;

      const containsTarget =
        optionsTarget.compareDocumentPosition(e.target as Node) &
        Node.DOCUMENT_POSITION_CONTAINED_BY;

      const optionsMenuButton =
        optionsElement.value.compareDocumentPosition(e.target as Node) &
        Node.DOCUMENT_POSITION_CONTAINED_BY;

      if (
        e.target !== optionsTarget &&
        e.target !== optionsElement.value &&
        !containsTarget &&
        !optionsMenuButton
      )
        isOptionsVisible.value = false;
    });

    watch(
      computed(() => store.state.canvas.selectedTool),
      (tool) => {
        if (tool.name !== "") isOptionsVisible.value = false;
      },
    );

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