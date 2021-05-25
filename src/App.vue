<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "App",
  components: {},
})
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
