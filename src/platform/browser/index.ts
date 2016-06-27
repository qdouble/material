import { provide, PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { ELEMENT_PROBE_PROVIDERS
  /*,ELEMENT_PROBE_PROVIDERS_PROD_MODE*/
} from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideDB } from '@ngrx/db';
import { runEffects } from '@ngrx/effects';

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
  ...ELEMENT_PROBE_PROVIDERS
];

/*
  Add custom _angular2_ providers here.
*/
export const NG_APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...JSONP_PROVIDERS,
  // ...ROUTER_PROVIDERS,
  // provide(LocationStrategy, { useClass: HashLocationStrategy }),
  disableDeprecatedForms(),
  provideForms(),
  provideStore(reducer),
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
  // ...ROUTER_DIRECTIVES
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
