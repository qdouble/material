// the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills'; // polyfills are moved to server.ts


// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import reducer from './app/reducers';
import actions from './app/actions';
import effects from './app/effects';
import services from './app/services';

import { AuthGuard, LoggedInRedirectGuard } from './app/guards';

// Application
import { App } from './app/app.component';
import { routes } from './app/routes';

export function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [
      App
    ],
    platformProviders: [
      { provide: ORIGIN_URL, useValue: 'http://localhost:3000' },
      { provide: APP_BASE_HREF, useValue: baseUrl },
    ],
    providers: [
      { provide: REQUEST_URL, useValue: url },
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS,
      provideStore(reducer),
      actions,
      runEffects(effects),
      services,
      AuthGuard,
      LoggedInRedirectGuard
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  };

  res.render('index', config);
}
