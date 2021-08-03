<template>
  <div v-bind="$attrs" class="flex justify-between w-full">
    <div>
      <p class="opacity-50 text-sm font-medium mb-0.5">{{ name }}</p>
      <p class="text-xl font-semibold">{{ value }}</p>
    </div>

    <c-button class="edit-btn self-end text-sm" @click="showEditModal = true">Edit</c-button>
  </div>

  <c-modal v-if="showEditModal" closeable @close="showEditModal = false" class="w-full max-w-2xl">
    <h1 class="text-bg-light text-center text-3xl font-bold opacity-80 mb-4">Update {{ name }}</h1>

    <form @submit.prevent="update">
      <c-input-text
        v-model="change"
        class="mb-4"
        dark
        :name="name"
        :label="name"
        :placeholder="name"
      />

      <c-input-password
        v-model="password"
        dark
        name="password"
        label="Enter password to update"
        placeholder="Password"
      />

      <c-button class="w-full mt-4" type="submit">Update</c-button>
    </form>
  </c-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CButton from "@/components/shared/Button/CButton.vue";
import CModal from "@/components/shared/Modal/CModal.vue";
import CInputText from "@/components/shared/Input/CInputText.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";

export default defineComponent({
  name: "CInfoField",
  inheritAttrs: false,
  components: {
    CButton,
    CModal,
    CInputText,
    CInputPassword,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup() {
    const showEditModal = ref(false);

    const change = ref("");
    const password = ref("");

    const update = () => {};

    return {
      showEditModal,

      change,
      password,
      update,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit-btn {
  height: unset;
  padding: 0.6rem 1rem;
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}
</style>