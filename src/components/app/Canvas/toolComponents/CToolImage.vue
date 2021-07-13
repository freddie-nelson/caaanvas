<template>
  <c-tool class="max-w-lg" :open="open" @close-btn="$emit('close')">
    <template v-slot:main>
      <img :src="data.image" class="max-w-2xl" alt="" />
      <div v-if="!data.image" class="w-80 h-52 font-mono flex items-center justify-center">
        <svg
          class="absolute w-full h-full text-b-light rounded-lg"
          preserveAspectRatio="xMinYMin meet"
          viewbox="0 0 200 200"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" stroke-width="2" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" stroke-width="2" />
        </svg>

        <p class="absolute bg-bg-light p-5 rounded-full text-t-main">No Image</p>
      </div>
    </template>

    <template v-slot:open>
      <div
        class="
          w-full
          h-96
          mt-5
          py-10
          box-content
          border-dashed border-4
          rounded-lg
          flex flex-col
          justify-center
        "
        :class="{ 'border-primary-500': highlight, 'border-t-main': !highlight }"
        @dragenter.prevent="highlight = true"
        @dragover.prevent="highlight = true"
        @dragleave.prevent="highlight = false"
        @drop.prevent="
          highlight = false;
          $event.dataTransfer.items[0]
            ? handleFile($event.dataTransfer.items[0].getAsFile())
            : null;
        "
      >
        <div
          @click="fileInput.click()"
          @dragenter.prevent="highlight = true"
          @dragover.prevent="highlight = true"
          class="flex flex-col items-center p-12 cursor-pointer"
        >
          <Icon class="w-10 h-10" :icon="icons.upload" />
          <p class="text-2xl font-semibold pt-3 text-center">
            {{ (file ? file.name : null) || "Upload Image" }}
          </p>
        </div>

        <c-button v-if="file && file.name" class="w-48 -mt-6 max-h-14 mx-auto" @click="uploadFile"
          >Upload</c-button
        >

        <input
          ref="fileInput"
          @change="handleFile($event.target.files[0])"
          class="hidden"
          type="file"
          name="image"
        />
      </div>
    </template>
  </c-tool>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

import CTool from "@/components/app/Canvas/toolComponents/CTool.vue";
import CButton from "@/components/shared/Button/CButton.vue";

import { Icon } from "@iconify/vue";
import uploadIcon from "@iconify-icons/feather/upload";

interface Image {
  image: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: "CToolImage",
  components: {
    CTool,
    CButton,
    Icon,
  },
  props: {
    data: {
      type: Object as () => Image,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const fileInput = ref(document.createElement("input"));
    const highlight = ref(false);

    const file = ref<File>();

    const handleFile = (f: File) => {
      if (!f || !f.type.match(/(png)|(jpg)|(jpeg)|(webp)/)) return;

      file.value = f;
    };

    const readFile = (file: File): Promise<string | ArrayBuffer> => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.onload = () => {
          if (fr.result) resolve(fr.result);
          else reject("error");
        };
        fr.onerror = () => reject("error");
      });
    };

    const uploadFile = async () => {
      if (!file.value) return;

      const data = await readFile(file.value);
      console.log(data);

      // TODO upload to server
    };

    return {
      fileInput,
      highlight,
      handleFile,
      file,
      uploadFile,
      icons: {
        upload: uploadIcon,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>