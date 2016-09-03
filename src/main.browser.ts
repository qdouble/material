import * as platform from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import '@ngrx/core/add/operator/select';
import './rxjs.imports';

import { MyAppModule } from './app/app.module';

if ('production' === ENV) {
  // Production
  enableProdMode();
} else {

}

platform.platformBrowserDynamic().bootstrapModule(MyAppModule);
