<template>
  <section class="text-t-main mt-12">
    <h1 class="text-3xl font-bold mb-3">Account Removal</h1>

    <p class="text-lg mb-5 text-t-sub">
      Disabling your account means you can recover it at anytime, however deletion is irreversible.
    </p>

    <c-button-outline class="mr-5" @click="showDisableModal = true"
      >Disable Account</c-button-outline
    >
    <c-button @click="showDeleteModal = true">Delete Account</c-button>
  </section>

  <c-modal
    v-if="showDisableModal"
    closeable
    @close="
      showDisableModal = false;
      password = '';
    "
    class="w-full max-w-2xl"
  >
    <h1 class="text-bg-light text-center text-3xl font-bold opacity-80 mb-4">Disable Account</h1>

    <form @submit.prevent="disableAccount">
      <c-input-password
        v-model="password"
        dark
        name="password"
        label="Password"
        placeholder="Password"
      />

      <c-button class="w-full mt-6" type="submit">Disable Account</c-button>
    </form>
  </c-modal>

  <c-modal
    v-if="showDeleteModal"
    closeable
    @close="
      showDeleteModal = false;
      password = '';
    "
    class="w-full max-w-2xl"
  >
    <h1 class="text-bg-light text-center text-3xl font-bold opacity-80 mb-2">Delete Account</h1>
    <p class="text-t-sub text-center mb-4 text-lg">
      Your account cannot be recovered after deletion.
    </p>

    <form @submit.prevent="deleteAccount">
      <c-input-password
        v-model="password"
        dark
        name="password"
        label="Password"
        placeholder="Password"
      />

      <c-button class="w-full mt-6" type="submit">Delete Account</c-button>
    </form>
  </c-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CModal from "@/components/shared/Modal/CModal.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonOutline from "@/components/shared/Button/CButtonOutline.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";

export default defineComponent({
  name: "CProfileManagement",
  components: { CButton, CButtonOutline, CModal, CInputPassword },
  setup() {
    const password = ref("");

    const showDisableModal = ref(false);
    const disableAccount = () => {};

    const showDeleteModal = ref(false);
    const deleteAccount = () => {};

    return {
      password,

      showDisableModal,
      disableAccount,

      showDeleteModal,
      deleteAccount,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>