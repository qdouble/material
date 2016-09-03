import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './compiled/src/app/app.module.ngfactory';
import '@ngrx/core/add/operator/select';
import './rxjs.imports';

if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
}

// Hot Module Replacement
export function bootstrapDomReady() {
  // bootstrap after document is ready
  document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV && HMR) {
  // activate hot module reload
  if (document.readyState === 'complete') {
    main();
  } else {
    bootstrapDomReady();
  }
  module.hot.accept();
} else {
  bootstrapDomReady();
}
