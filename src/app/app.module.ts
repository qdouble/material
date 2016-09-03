import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { Actions } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
// import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

import { routes } from './routes';
import { rootReducer } from './reducers';
import { effects } from './effects';
import { services } from './services';
import { actions } from './actions';

import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { APP_PROVIDERS } from './app.providers';
import { DebounceInputControlValueAccessor } from './validators';

import { App } from './app.component';
import { PAGES_COMMON, PAGES_COMPONENTS } from './pages';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdListModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(rootReducer)
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
    actions,
    Actions,
    ...APP_PROVIDERS,
    effects,
    services
  ],
  entryComponents: [
    ...PAGES_COMPONENTS
  ],
  bootstrap: [App]
})

export class MyAppModule { };
