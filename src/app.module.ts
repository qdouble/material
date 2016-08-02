import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdInput } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdToolbar } from '@angular2-material/toolbar';

import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

import { APPLICATION_DIRECTIVES, PROVIDERS } from './platform/browser';
import { PROJECT_DIRECTIVES } from './app/components';
import { ENV_PROVIDERS } from './platform/environment';
import { APP_PROVIDERS } from './app';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { App } from './app/app.component';
import { routes } from './app/routes';
import { PAGES_COMMON, PAGES_COMPONENTS } from './app/pages';

const MATERIAL_DESIGN_DIRECTIVES = [
  MdButton,
  MdCheckbox,
  MD_CARD_DIRECTIVES,
  MdIcon,
  MdInput,
  MD_LIST_DIRECTIVES,
  MD_SIDENAV_DIRECTIVES,
  MdToolbar
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([...routes
    ], {})
  ],
  declarations: [
    App,
    ...MATERIAL_DESIGN_DIRECTIVES,
    ...PAGES_COMMON,
    ...PAGES_COMPONENTS,
    ...PROJECT_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    // StoreLogMonitorComponent
  ],
  providers: [
    ...APP_PROVIDERS,
    ...PROVIDERS,
    MdIconRegistry
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    App,
    ...PAGES_COMPONENTS
  ]
})

export class MyAppModule {
  constructor(appRef: ApplicationRef) {
    // long form bootstrap (optional)
    // could, for example, check auth or client config or ... and then show a specific component 
    appRef.bootstrap(App);
  }
};
