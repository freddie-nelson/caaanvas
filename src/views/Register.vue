<template>
  <router-link class="absolute top-5 left-6 select-none" to="/">
    <c-gradient-heading :size="3" noscale>caaanvas.</c-gradient-heading>
  </router-link>
  <main class="w-full h-full bg-bg-light p-6 flex justify-center items-center flex-col">
    <c-gradient-heading :size="6" noscale>Register</c-gradient-heading>
    <form class="max-w-xl w-full px-4 mt-6 flex flex-col" @submit.prevent="register">
      <c-input-text
        name="username"
        placeholder="johnsmith17"
        label="Username"
        :error="errors.username"
        v-model="username"
        class="mb-4"
      />
      <c-input-text
        name="email"
        placeholder="john@example.com"
        label="Email"
        :error="errors.email"
        v-model="email"
        class="mb-4"
      />
      <c-input-password
        name="password"
        label="Password"
        placeholder="securepassword123"
        :error="errors.password"
        v-model="password"
      />
      <c-input-text
        name="confirmPassword"
        label="Confirm Password"
        censor
        v-model="confirmPassword"
      />

      <c-button class="w-full mt-7 mb-5" type="submit">Create Account</c-button>
      <c-auth-google register />

      <c-button-text class="self-end mt-2" @click="$router.push({ name: 'Login' })">
        Already have an account?
      </c-button-text>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Errors, validateRegisterForm } from "@/utils/validateInput";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "@firebase/auth";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CInputText from "@/components/shared/Input/CInputText.vue";
import CInputPassword from "@/components/shared/Input/CInputPassword.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import CButtonText from "@/components/shared/Button/CButtonText.vue";
import CAuthGoogle from "@/components/app/AuthButtons/CAuthGoogle.vue";

export default defineComponent({
  name: "Register",
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

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const errors: Errors = reactive({
      username: "",
      email: "",
      password: "",
    });

    const register = async () => {
      errors.username = "";
      errors.email = "";
      errors.password = "";

      const report = validateRegisterForm(
        username.value,
        email.value,
        password.value,
        confirmPassword.value,
      );
      if (!report.valid) return (errors[report.field as string] = report.msg);

      try {
        const credential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log(credential);
        await updateProfile(credential.user, { displayName: username.value });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,

      errors,

      register,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>