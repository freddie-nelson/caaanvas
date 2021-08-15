<template>
  <c-button type="button" @click="signInWithGoogle">
    <Icon :icon="icons.google" class="google-icon mr-2" />
    {{ register ? "Register" : "Sign in" }} with Google
  </c-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

import CButton from "@/components/shared/Button/CButton.vue";

import { Icon } from "@iconify/vue";
import googleIcon from "@iconify-icons/logos/google-icon";

export default defineComponent({
  name: "CAuthGoogle",
  components: {
    Icon,
    CButton,
  },
  props: {
    register: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
      try {
        const credential = await signInWithPopup(auth, provider);
        console.log(credential);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      signInWithGoogle,

      icons: {
        google: googleIcon,
      },
    };
  },
});
</script>

<style lang="scss">
.google-icon * {
  fill: var(--bg-light) !important;
}
</style>