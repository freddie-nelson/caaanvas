<template>
  <c-tool modalClasses="max-w-none draw-tool-modal" :open="open" @close="$emit('close')">
    <template v-slot:main>
      <img :src="data.image" alt="" />
      <div v-if="!data.image" class="w-80 h-52 font-mono flex items-center justify-center">
        <svg
          class="absolute w-full h-full text-b-light rounded-lg"
          preserveAspectRatio="xMinYMin meet"
          viewbox="0 0 200 200"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" stroke-width="2" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" stroke-width="2" />
        </svg>

        <p class="absolute bg-bg-light p-5 rounded-full text-t-main">No Drawing</p>
      </div>
    </template>

    <template v-slot:open>
      <c-canvas-draw
        id="drawCanvas"
        class="w-full h-full bg-white rounded-xl border-4 border-b-light"
        :brushColor="currentColor"
        :brushSize="currentSize"
      />

      <!-- color selector -->
      <div
        class="
          max-w-4xl
          px-6
          h-24
          rounded-lg
          flex
          justify-between
          items-center
          absolute
          bottom-6
          right-0
          left-0
          mx-auto
        "
        style="background-color: #632c0d"
      >
        <button
          v-for="color in colors"
          :key="color"
          class="w-14 h-14 rounded-full focus:outline-none"
          :class="{
            'border-4': currentColor === color,
            'border-black': color !== 'black',
            'border-white': color === 'black',
          }"
          :style="{ backgroundColor: color }"
          @click="currentColor = color"
        ></button>
      </div>

      <div
        class="
          h-48
          w-16
          py-4
          rounded-lg
          flex flex-col-reverse
          justify-between
          items-center
          absolute
          top-16
          right-6
        "
        style="background-color: #632c0d"
      >
        <button
          v-for="size in sizes"
          :key="size"
          class="rounded-full focus:outline-none"
          :class="currentSize === size ? 'bg-black' : 'bg-white'"
          :style="{ width: `${size}px`, height: `${size}px` }"
          @click="currentSize = size"
        ></button>
      </div>

      <c-button
        class="absolute top-5 right-0 left-0 mx-auto"
        style="transform: scale(0.8); transform-origin: top center"
        @click="saveDrawing"
      >
        Save Drawing
      </c-button>
    </template>
  </c-tool>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";
import CCanvasDraw from "@/components/shared/Canvas/CCanvasDraw.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import { useStore } from "@/store";

interface Draw {
  image: string;
}

export default defineComponent({
  name: "CToolDraw",
  components: {
    CTool,
    CCanvasDraw,
    CButton,
  },
  props: {
    data: {
      type: Object as () => Draw,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    const currentColor = ref("red");
    const currentSize = ref(10);

    const saveDrawing = () => {
      const canvas = <HTMLCanvasElement>document.getElementById("drawCanvas");
      if (!canvas) return;

      const data = canvas.toDataURL("image/webp", 0.8);
      console.log(data);

      // TODO save data to server

      store.commit("ADD_TOAST", { text: "💾 Drawing saved!" });
    };

    return {
      currentColor,
      colors: ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white", "black"],

      currentSize,
      sizes: [10, 15, 25, 40],

      saveDrawing,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.draw-tool-modal {
  width: 92vw;
  height: 92vh;
  // padding: 3.5rem;
}
</style>