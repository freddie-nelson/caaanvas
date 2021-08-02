<template>
  <div class="flex flex-col">
    <c-input-text
      :name="name"
      :label="label"
      :placeholder="placeholder"
      v-model="value"
      :censor="censor"
      :dark="dark"
    />
    <c-button-text class="self-end" type="button" @click="censor = !censor">
      {{ censor ? "show characters" : "hide characters" }}
    </c-button-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import CButtonText from "../Button/CButtonText.vue";

import CInputText from "./CInputText.vue";

export default defineComponent({
  name: "CInputPassword",
  components: {
    CInputText,
    CButtonText,
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
    dark: {
      type: Boolean,
      default: false,
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