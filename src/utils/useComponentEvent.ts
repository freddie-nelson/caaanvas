import { onMounted, onUnmounted } from "vue";

export default function (
  element: HTMLElement,
  event: keyof HTMLElementEventMap,
  callback: (e: Event) => void,
) {
  onMounted(() => {
    element.addEventListener(event, callback);
  });

  onUnmounted(() => {
    element.removeEventListener(event, callback);
  });
}
