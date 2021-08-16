<template>
  <router-link class="absolute top-5 left-6 select-none" to="/">
    <c-gradient-heading :size="3" noscale>caaanvas.</c-gradient-heading>
  </router-link>

  <main
    v-if="!isLoading"
    class="w-full h-full bg-bg-light p-6 flex justify-center items-center flex-col"
  >
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
      <c-auth-google
        @popup="isLoading = true"
        @auth="!$event ? (isLoading = false) : $router.push({ name: 'Dash' })"
      />

      <c-button-text class="self-end mt-2" @click="$router.push({ name: 'Register' })">
        Need an account?
      </c-button-text>
    </form>
  </main>

  <main v-else class="w-full h-full bg-bg-light p-6 flex justify-center items-center flex-col">
    <c-spinner-circle class="transform scale-50" />
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
import CSpinnerCircle from "@/components/shared/Spinner/CSpinnerCircle.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: {
    CGradientHeading,
    CInputText,
    CInputPassword,
    CButton,
    CButtonText,
    CAuthGoogle,
    CSpinnerCircle,
  },
  setup() {
    const router = useRouter();
    const auth = getAuth();

    const email = ref("");
    const password = ref("");

    const errors: Errors = reactive({
      email: "",
      password: "",
    });

    const isLoading = ref(false);

    const signIn = async () => {
      errors.email = "";
      errors.password = "";

      const report = validateLoginForm(email.value, password.value);
      if (!report.valid) return (errors[report.field as string] = report.msg);

      isLoading.value = true;

      try {
        const credential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(credential);
      } catch (error) {
        console.log(error);
      }

      router.push({ name: "Dash" });
      isLoading.value = false;
    };

    return {
      email,
      password,

      errors,

      isLoading,
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>