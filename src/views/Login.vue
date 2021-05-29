<template>
  <router-link class="absolute top-5 left-6 select-none" to="/">
    <c-gradient-heading :size="3" noscale>caaanvas.</c-gradient-heading>
  </router-link>
  <main class="w-full h-full bg-bg-light p-6 flex justify-center items-center flex-col">
    <c-gradient-heading :size="6" noscale>Login</c-gradient-heading>
    <form class="max-w-xl w-full px-4 mt-6 flex flex-col" @submit.prevent>
      <c-input-text name="email" placeholder="john@example.com" label="Email" v-model="email" />
      <c-input-password
        class="mt-4"
        name="password"
        label="Password"
        placeholder="securepassword123"
        v-model="password"
      />
      <c-button class="w-full mt-5">Sign In</c-button>
      <c-button-text class="self-end mt-2" @click="$router.push({ name: 'Register' })">
        Already have an account?
      </c-button-text>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CInputText from "@/components/shared/Input/CInputText.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonText from "@/components/shared/Button/CButtonText.vue";

export default defineComponent({
  name: "Login",
  components: {
    CGradientHeading,
    CInputText,
    CInputPassword,
    CButton,
    CButtonText,
  },
  setup() {
    const email = ref("");
    const password = ref("");

    return {
      email,
      password,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>