import { createStore, useStore as vuexUseStore } from "vuex";

import textIcon from "@iconify-icons/feather/type";
import linkIcon from "@iconify-icons/feather/link";
import imageIcon from "@iconify-icons/feather/image";
import drawIcon from "@iconify-icons/feather/edit-2";
import checkpointIcon from "@iconify-icons/feather/flag";
import { IconifyIconData } from "@iconify/vue";

export interface Toast {
  text: string;
  duration?: number;
}

export interface Tool {
  name: string;
  icon?: IconifyIconData;
}

export interface Canvas {
  selectedTool: Tool;
  tools: Tool[];
}
export interface State {
  toastQueue: Toast[];
  canvas: Canvas;
}

const store = createStore<State>({
  state: {
    toastQueue: [],
    canvas: {
      selectedTool: { name: "" },
      tools: [
        { name: "text", icon: textIcon },
        { name: "link", icon: linkIcon },
        { name: "image", icon: imageIcon },
        { name: "draw", icon: drawIcon },
        { name: "checkpoint", icon: checkpointIcon },
      ],
    },
  },
  mutations: {
    REMOVE_TOAST(state) {
      state.toastQueue.shift();
    },
    ADD_TOAST(state, toast: Toast) {
      state.toastQueue.push(toast);
    },

    SET_SELECTED_TOOL(state, tool: Tool) {
      state.canvas.selectedTool = tool;
    },
  },
  actions: {},
  getters: {},
});

export const useStore = () => {
  return vuexUseStore<State>();
};

export default store;
