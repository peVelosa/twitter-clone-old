export function adjustTextAreaHeight(el: HTMLElement | null) {
  if (!el) return;
  el.style.height = "0px";
  const scrollHeight = el.scrollHeight;
  el.style.height = scrollHeight + "px";
}
export function focusInput(el: HTMLElement | null) {
  if (!el) return;
  el.focus();
}
