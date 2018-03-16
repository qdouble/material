import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IdlePreloadModule } from 'angular-idle-preload';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { FacebookModule } from 'ngx-facebook';

import { MATERIAL_MODULES } from './material.modules';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { FEATURE_MODULES } from './features';
import { FormInputModule } from './components/input-fields/form-input';
import { SelectInputModule } from './components/input-fields/select-input';
import { TextareaInputModule } from './components/input-fields/textarea-input';

import { CreditRequestEffects } from './features/support/credit-request.effects';
import { TicketEffects } from './features/support/ticket.effects';

import { CountryEffects } from './effects/country';
import { NotificationEffects } from './effects/notification';
import { OfferEffects } from './effects/offer';
import { OrderEffects } from './effects/order';
import { PrizeEffects } from './effects/prize';
import { RouterEffects } from './effects/router';
import { UIEffects } from './effects/ui';
import { UserEffects } from './effects/user';
import { StoreDevToolsModule } from './features/store-devtools.module';

import { CustomPipesModule } from './pipes';
import { DEV_REDUCERS, reducers, resetOnLogout, AppState } from './reducers';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrument({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);


export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  CustomPipesModule,
  EffectsModule.forRoot([
    CountryEffects,
    CreditRequestEffects,
    NotificationEffects,
    OfferEffects,
    OrderEffects,
    PrizeEffects,
    RouterEffects,
    TicketEffects,
    UIEffects,
    UserEffects
  ]),
  FacebookModule.forRoot(),
  FEATURE_MODULES,
  FlexLayoutModule,
  FormInputModule,
  FormsModule,
  IdlePreloadModule.forRoot(),
  MATERIAL_MODULES,
  ReactiveFormsModule,
  SelectInputModule,
  StoreRouterConnectingModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TextareaInputModule,
  TransferHttpModule
];
