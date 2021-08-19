<template>
  <section class="text-t-main mt-12">
    <h1 class="text-3xl font-bold mb-5">Password and Authentication</h1>

    <c-button @click="showChangePasswordModal = true">Change Password</c-button>
  </section>

  <c-modal
    v-if="showChangePasswordModal"
    closeable
    @close="showChangePasswordModal = false"
    class="w-full max-w-2xl"
  >
    <h1 class="text-bg-light text-center text-3xl font-bold opacity-80 mb-2">Change Password</h1>
    <p class="text-t-sub text-center text-lg mb-6">
      Enter your current password and a new password.
    </p>

    <form @submit.prevent="changePassword">
      <c-input-password
        v-model="current"
        dark
        name="currentPassword"
        label="Current Password"
        placeholder="Current Password"
      />

      <c-input-password
        v-model="change"
        dark
        name="newPassword"
        label="New Password"
        placeholder="New Password"
      />

      <c-input-text
        v-model="confirm"
        dark
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        :censor="true"
      />

      <c-button class="w-full mt-10" type="submit">Change Password</c-button>
    </form>
  </c-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CButton from "@/components/shared/Button/CButton.vue";
import CModal from "@/components/shared/Modal/CModal.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";
import CInputText from "@/components/shared/Input/CInputText.vue";

export default defineComponent({
  name: "CProfileAuth",
  components: { CButton, CModal, CInputPassword, CInputText },
  setup() {
    const showChangePasswordModal = ref(false);

    const current = ref("");
    const change = ref("");
    const confirm = ref("");

    const changePassword = () => {
      if (change.value !== confirm.value) return;
    };

    return {
      showChangePasswordModal,

      current,
      change,
      confirm,
      changePassword,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>