<template>
  <div>
    <label v-if="label" class="block text-t-sub font-medium" :for="name">{{ label }}</label>
    <input
      class="w-full block p-3 border-solid border-2 rounded-lg text-input-blur focus:text-input-focus border-b-light focus:outline-none focus:border-b-highlight transition-colors duration-300"
      :type="censor ? 'password' : 'text'"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CInputText",
  components: {},
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
    censor: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>