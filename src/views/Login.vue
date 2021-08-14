<template>
  <router-link class="absolute top-5 left-6 select-none" to="/">
    <c-gradient-heading :size="3" noscale>caaanvas.</c-gradient-heading>
  </router-link>
  <main class="w-full h-full bg-bg-light p-6 flex justify-center items-center flex-col">
    <c-gradient-heading :size="6" noscale>Login</c-gradient-heading>
    <form class="max-w-xl w-full px-4 mt-6 flex flex-col" @submit.prevent="signIn">
      <c-input-text
        name="email"
        placeholder="john@example.com"
        label="Email"
        :error="errors.email"
        v-model="email"
      />
      <c-input-password
        class="mt-4"
        name="password"
        label="Password"
        placeholder="securepassword123"
        :error="errors.password"
        v-model="password"
      />
      <c-button class="w-full mt-5 mb-5" type="submit">Sign In</c-button>
      <c-auth-google />

      <c-button-text class="self-end mt-2" @click="$router.push({ name: 'Register' })">
        Need an account?
      </c-button-text>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Errors, validateLoginForm } from "@/utils/validateInput";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CInputText from "@/components/shared/Input/CInputText.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonText from "@/components/shared/Button/CButtonText.vue";
import CAuthGoogle from "@/components/app/AuthButtons/CAuthGoogle.vue";

export default defineComponent({
  name: "Login",
  components: {
    CGradientHeading,
    CInputText,
    CInputPassword,
    CButton,
    CButtonText,
    CAuthGoogle,
  },
  setup() {
    const auth = getAuth();

    const email = ref("");
    const password = ref("");

    const errors: Errors = reactive({
      email: "",
      password: "",
    });

    const signIn = async () => {
      errors.email = "";
      errors.password = "";

      const report = validateLoginForm(email.value, password.value);
      if (!report.valid) return (errors[report.field as string] = report.msg);

      try {
        const credential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(credential);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,

      errors,

      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>