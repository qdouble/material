import {
  NgModule, ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgModuleFactoryLoader } from '@angular/core';
import { AsyncNgModuleLoader } from './app/shared/async-ng-module-loader';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdIconRegistry, MdIconModule } from '@angular2-material/icon';
import { MdInput, MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

import { APPLICATION_DIRECTIVES, PROVIDERS } from './platform/browser';
import { PROJECT_COMPONENT_DIRECTIVES } from './app/components';
import { ENV_PROVIDERS } from './platform/environment';
import { APP_PROVIDERS } from './app';
import { DebounceInputControlValueAccessor } from './app/validators';

import { App } from './app/app.component';
import { routes } from './app/routes';
import { PAGES_COMMON, PAGES_COMPONENTS } from './app/pages';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      ...routes
    ], {})
  ],
  declarations: [
    App,
    ...PAGES_COMMON,
    ...PAGES_COMPONENTS,
    ...PROJECT_COMPONENT_DIRECTIVES,
    DebounceInputControlValueAccessor,
    // StoreLogMonitorComponent
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: AsyncNgModuleLoader },
    ...APP_PROVIDERS,
    ...PROVIDERS,
    MdIconRegistry
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ...PAGES_COMPONENTS
  ],
  bootstrap: [App]
})

export class MyAppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(App);
  }
};
