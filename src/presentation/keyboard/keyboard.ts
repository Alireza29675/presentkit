const interactiveSelector = [
  'input', 'textarea', 'select', 'button', 'a[href]', 'summary', 'audio', 'video',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="textbox"]', '[role="button"]', '[role="slider"]', '[role="spinbutton"]',
  '[role="combobox"]', '[role="listbox"]', '[role="menu"]', '[role="tablist"]',
  '[role="tree"]', '[role="grid"]', '[role="checkbox"]', '[role="radio"]',
  '[role="switch"]', '[data-presentation-keys="local"]',
].join(',');

export function navigationActionForKey(event: KeyboardEvent) {
  if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return null;
  }
  // composedPath also respects controls inside a shadow root.
  const path = event.composedPath?.() ?? [event.target];
  if (path.some((element) => element instanceof Element && element.closest(interactiveSelector))) return null;

  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) return 'next';
  if (['ArrowLeft', 'PageUp'].includes(event.key)) return 'previous';
  return null;
}
