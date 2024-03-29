import { createStore, useStore as vuexUseStore } from "vuex";

import textIcon from "@iconify-icons/feather/type";
import linkIcon from "@iconify-icons/feather/link";
import imageIcon from "@iconify-icons/feather/image";
import drawIcon from "@iconify-icons/feather/edit-2";
import flagIcon from "@iconify-icons/feather/flag";
import { IconifyIconData } from "@iconify/vue";

export interface Toast {
  text: string;
  duration?: number;
}

export interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  data: any;
  index?: number;
}

export interface Canvas {
  title: string;
  components: Component[];
}

export interface Tool {
  name: string;
  icon: IconifyIconData;
}

export interface Zoom {
  scale: number;
  level: number;
}

export interface CanvasView {
  selectedTool: Tool;
  tools: Tool[];
  zoom: Zoom;
  current: Canvas;
  flagToFocus?: Component;
}
export interface State {
  toastQueue: Toast[];
  canvas: CanvasView;
}

const store = createStore<State>({
  state: {
    toastQueue: [],
    canvas: {
      selectedTool: { name: "", icon: textIcon },
      tools: [
        { name: "text", icon: textIcon },
        { name: "link", icon: linkIcon },
        { name: "image", icon: imageIcon },
        { name: "draw", icon: drawIcon },
        { name: "flag", icon: flagIcon },
      ],
      zoom: {
        scale: 1,
        level: 100,
      },
      current: {
        title: "Test",
        components: [],
      },
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

    SET_ZOOM_SCALE(state, scale: number) {
      state.canvas.zoom.scale = scale;
      state.canvas.zoom.level = Math.round(scale * 100);
    },

    SET_FLAG_TO_FOCUS(state, flag: Component) {
      state.canvas.flagToFocus = flag;
    },

    ADD_COMPONENT(state, component: Component) {
      state.canvas.current?.components.push(component);
    },
    REMOVE_COMPONENT(state, index: number) {
      state.canvas.current.components.splice(index, 1);
    },
    SET_COMPONENT_POSITION(state, data: { index: number; x: number; y: number }) {
      state.canvas.current.components[data.index].x = data.x;
      state.canvas.current.components[data.index].y = data.y;
    },
  },
  actions: {},
  getters: {},
});

export const useStore = () => {
  return vuexUseStore<State>();
};

export default store;
