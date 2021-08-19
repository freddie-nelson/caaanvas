<template>
  <c-tool
    modalClasses="max-w-none draw-tool-modal flex justify-center items-center"
    :open="open"
    @close-btn="
      $emit('close')
      // saveDrawing();
    "
  >
    <template v-slot:main>
      <img class="max-w-3xl" :src="data.image" alt="" />
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

      <div
        class="absolute top-5 select-none"
        style="transform: scale(0.8); transform-origin: top center"
      >
        <c-button class="mr-9 flex items-center" @click="saveDrawing">
          <Icon class="w-5 h-5 mr-2" :icon="icons.save" /> Save Drawing
        </c-button>

        <c-button class="bg-danger-600 flex items-center" @click="clearDrawing">
          <Icon class="w-5 h-5 mr-2" :icon="icons.trash" /> Clear Drawing
        </c-button>
      </div>
    </template>
  </c-tool>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";
import CCanvasDraw from "@/components/shared/Canvas/CCanvasDraw.vue";
import CButton from "@/components/shared/Button/CButton.vue";
import { useStore } from "@/store";

import { Icon } from "@iconify/vue";
import saveIcon from "@iconify-icons/feather/save";
import trashIcon from "@iconify-icons/feather/trash-2";

interface Draw {
  image: string;
}

export default defineComponent({
  name: "CToolDraw",
  components: {
    CTool,
    CCanvasDraw,
    CButton,
    Icon,
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
  setup(props) {
    const store = useStore();

    const currentColor = ref("#e74c3c");
    const currentSize = ref(15);

    const useCanvas = () => {
      const canvas = <HTMLCanvasElement>document.getElementById("drawCanvas");
      const ctx = canvas?.getContext("2d");

      return {
        canvas,
        ctx,
      };
    };

    const saveDrawing = () => {
      const { canvas } = useCanvas();
      if (!canvas) return;

      const data = canvas.toDataURL("image/png");

      // TODO:  upload data to server

      store.commit("ADD_TOAST", { text: "💾 Drawing saved!" });
    };

    const clearDrawing = () => {
      const { canvas, ctx } = useCanvas();
      if (!canvas || !ctx) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    watch(
      computed(() => props.open),
      (open) => {
        if (!open || !props.data.image) return;

        requestAnimationFrame(() => {
          const { canvas, ctx } = useCanvas();
          if (!canvas || !ctx) return;

          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = props.data.image;
        });
      },
    );

    return {
      currentColor,
      colors: [
        "#e74c3c",
        "#e67e22",
        "#f1c40f",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#f472d0",
        "white",
        "black",
      ],

      currentSize,
      sizes: [10, 15, 25, 40],

      saveDrawing,
      clearDrawing,

      icons: {
        trash: trashIcon,
        save: saveIcon,
      },
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