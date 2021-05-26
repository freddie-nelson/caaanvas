import { createStore, useStore as vuexUseStore } from "vuex";

export interface Toast {
  text: string;
  duration?: number;
}
export interface State {
  toastQueue: Toast[];
}

const store = createStore<State>({
  state: {
    toastQueue: [],
  },
  mutations: {
    REMOVE_TOAST(state) {
      state.toastQueue.shift();
    },
    ADD_TOAST(state, toast: Toast) {
      state.toastQueue.push(toast);
    },
  },
  actions: {},
  getters: {},
});

export const useStore = () => {
  return vuexUseStore<State>();
};

export default store;
