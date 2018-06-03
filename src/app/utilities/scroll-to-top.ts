export function scrollToTop() {
  typeof document !== 'undefined' && document.getElementById('os-toolbar')
    ? document.getElementById('os-toolbar').scrollIntoView()
    : {}; // tslint:disable-line
}
