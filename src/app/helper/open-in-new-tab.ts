export function openInNewTab(url) {
  const win = window.open(url);
  win.focus();
}
