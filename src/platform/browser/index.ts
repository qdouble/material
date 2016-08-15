import { provide, PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
// import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideDB } from '@ngrx/db';
import { runEffects } from '@ngrx/effects';
// import { instrumentStore } from '@ngrx/store-devtools';
// import { useLogMonitor } from '@ngrx/store-log-monitor';

import { routes } from '../../app/routes';
import schema from '../../app/db-schema';
import reducer from '../../app/reducers';
import effects from '../../app/effects';
import services from '../../app/services';
import actions from '../../app/actions';


/*
  Add custom env providers here.
*/
export const ENVIRONMENT_PROVIDERS = [

];

/*
  Add custom _angular2_ providers here.
*/
export const NG_APPLICATION_PROVIDERS = [
  HTTP_PROVIDERS,
  provideStore(reducer),
  // instrumentStore({
  //   monitor: useLogMonitor({
  //           visible: true,
  //           position: 'right'
  //       })
  // }),
  runEffects(effects),
  provideRouter(routes),
  // provideDB(schema),
  services,
  actions
];

/*
  Add your custom pipes here.
*/
export const APPLICATION_PIPES = [

];

/*
  Add your custom directives here to be use anywhere.
*/
export const APPLICATION_DIRECTIVES = [

];


/*
  These are the 3 exported constants we will add to our bootstrap in our main file.
*/
export const ENV_PROVIDERS = [
  ...ENVIRONMENT_PROVIDERS
];

export const PROVIDERS = [
  ...NG_APPLICATION_PROVIDERS
];

export const PIPES = [
  provide(PLATFORM_PIPES, { multi: true, useValue: APPLICATION_PIPES })
];

export const DIRECTIVES = [
  provide(PLATFORM_DIRECTIVES, { multi: true, useValue: APPLICATION_DIRECTIVES })
];
