<template>
  <div>
    <input
      class="hidden"
      type="checkbox"
      v-model="checked"
      @input="$emit('update:modelValue', checked)"
    />

    <button
      :class="checked ? 'bg-accent-500' : 'bg-t-sub'"
      class="rounded-full w-20 h-10 border-4 border-t-sub focus:outline-none flex transition-colors"
      @click="
        checked = !checked;
        $emit('update:modelValue', checked);
      "
    >
      <div
        :class="checked ? ' translate-x-10' : ''"
        class="rounded-full bg-bg-light w-8 h-full transform transition-transform"
      ></div>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CInputToggle",
  components: {},
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const checked = ref(false);
    watch(
      computed(() => props.modelValue),
      () => {
        if (checked.value !== props.modelValue) checked.value = props.modelValue;
      },
    );

    return {
      checked,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>