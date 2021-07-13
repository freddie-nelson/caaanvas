<template>
  <c-tool :open="open" @close-btn="close">
    <template v-slot:main></template>

    <template v-slot:open>
      <label for="url" class="font-medium pb-1 text-lg">Flag Name</label>
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
        placeholder="Flag X"
        type="text"
        name="name"
        v-model="name"
      />
      <p v-if="!isNameValid" class="mt-2.5 text-danger-500 font-medium">
        {{ name ? `${name} is already taken.` : "Flag name cannot be empty." }}
      </p>
    </template>
  </c-tool>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";
import { useStore } from "@/store";

interface Flag {
  name: string;
  color: string;
}

export default defineComponent({
  name: "CToolFlag",
  components: {
    CTool,
  },
  props: {
    data: {
      type: Object as () => Flag,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const canvas = store.state.canvas.current;

    const name = ref(props.data.name);
    const isNameValid = computed(() => {
      if (!name.value) return false;

      return !canvas.components.find(
        (c) => c.type === "flag" && c.data !== props.data && c.data.name === name.value,
      );
    });

    const close = () => {
      if (isNameValid.value) {
        props.data.name = name.value;
      } else {
        name.value = props.data.name;
      }

      emit("close");
    };

    return {
      name,
      isNameValid,
      close,

      colors: [
        "#e74c3c",
        "#e67e22",
        "#f1c40f",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#f472d0",
        "white",
        "black",
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
</style>