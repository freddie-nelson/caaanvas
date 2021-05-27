<template>
  <div class="flex flex-col">
    <c-input-text
      :name="name"
      :label="label"
      :placeholder="placeholder"
      v-model="value"
      :censor="censor"
    />
    <button
      class="self-end text-sm text-primary-500 font-medium underline mt-1.5 focus:outline-none transition-colors duration-300 hover:text-accent-500 focus:text-accent-500"
      type="button"
      @click="censor = !censor"
    >
      {{ censor ? "show characters" : "hide characters" }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import CInputText from "./CInputText.vue";

export default defineComponent({
  name: "CInputPassword",
  components: {
    CInputText,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    watch(value, () => emit("update:modelValue", value));
    watch(
      computed(() => props.modelValue),
      () => (value.value = props.modelValue),
    );

    const censor = ref(true);

    return {
      value,
      censor,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>