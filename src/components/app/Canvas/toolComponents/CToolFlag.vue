<template>
  <c-tool
    :open="open"
    @close-btn="close"
    class="flag border-none rounded-full flex justify-center"
    :style="{
      backgroundColor: data.color,
      boxShadow: `0px 0px 0px 20px ${data.color}90, 0px 0px 0px 40px ${data.color}30`,
    }"
  >
    <template v-slot:main>
      <Icon class="w-14 h-14 m-8 text-bg-light" :icon="icons.flag" />

      <p
        class="
          absolute
          -bottom-5
          bg-bg-light
          border-4
          rounded-lg
          whitespace-nowrap
          font-medium
          px-1.5
          py-1
        "
        :style="{ borderColor: data.color, color: data.color }"
      >
        {{ data.name }}
      </p>
    </template>

    <template v-slot:open>
      <label for="name" class="font-medium pb-1 text-lg">Flag Name</label>
      <input
        class="
          text-xl
          font-medium
          w-full
          p-3
          rounded-md
          bg-transparent
          border-2 border-b-light
          transition-colors
          focus:border-b-dark
          focus:outline-none
        "
        placeholder="Flag X"
        type="text"
        name="name"
        v-model="name"
      />
      <p v-if="!isNameValid" class="mt-2.5 text-danger-500 font-medium">
        {{ name ? `${name} is already taken.` : "Flag name cannot be empty." }}
      </p>

      <label for="color" class="font-medium pb-1 text-lg mt-3">Color</label>
      <div class="flex relative">
        <button
          v-for="color in colors"
          :key="color"
          class="color-btn flex-grow rounded-lg h-14 mr-3 focus:outline-none"
          :class="color === data.color ? 'shadow-highlight' : ''"
          :style="{
            backgroundColor: color,
          }"
          @click="data.color = color"
        ></button>
      </div>
    </template>
  </c-tool>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";

import { Icon } from "@iconify/vue";
import flagIcon from "@iconify-icons/feather/flag";

interface Flag {
  name: string;
  color: string;
}

export default defineComponent({
  name: "CToolFlag",
  components: {
    CTool,
    Icon,
  },
  props: {
    data: {
      type: Object as () => Flag,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const canvas = store.state.canvas.current;

    const name = ref(props.data.name);
    const isNameValid = computed(() => {
      if (!name.value) return false;

      return !canvas.components.find(
        (c) => c.type === "flag" && c.data !== props.data && c.data.name === name.value,
      );
    });

    const close = () => {
      if (isNameValid.value) {
        props.data.name = name.value;
      } else {
        name.value = props.data.name;
      }

      emit("close");
    };

    return {
      name,
      isNameValid,
      close,

      colors: [
        "#e74c3c",
        "#e67e22",
        "#f1c40f",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#f472d0",
        "#000000",
      ],

      icons: {
        flag: flagIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.color-btn:last-of-type {
  margin-right: 0;
}
</style>