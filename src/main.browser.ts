import { platformBrowser } from '@angular/platform-browser';
import * as platform from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import '@ngrx/core/add/operator/select';
import './rxjs.imports';

import { MyAppModule } from './app/app.module';
import { MyAppModuleNgFactory } from './compiled/src/app/app.module.ngfactory';

if ('production' === ENV) {
  // Production
  enableProdMode();
} else {

}

// platform.platformBrowserDynamic().bootstrapModule(MyAppModule)
//   .catch(err => console.log(err));

platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory)
  .catch(err => console.log(err));
