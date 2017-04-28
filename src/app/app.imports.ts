import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';
import { MaterialModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { FEATURE_MODULES } from './features';
import { FormInputModule } from './components/input-fields/form-input';
import { SelectInputModule } from './components/input-fields/select-input';
import { TextareaInputModule } from './components/input-fields/textarea-input';

import { CreditRequestEffects } from './features/support/credit-request.effects';
import { TicketEffects } from './features/support/ticket.effects';

import { routes } from './app.routing';
import { CountryEffects } from './effects/country';
import { NotificationEffects } from './effects/notification';
import { OfferEffects } from './effects/offer';
import { OrderEffects } from './effects/order';
import { PrizeEffects } from './effects/prize';
import { UIEffects } from './effects/ui';
import { UserEffects } from './effects/user';
import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';

import { CustomPipesModule } from './pipes';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  // BrowserAnimationsModule,
  CustomPipesModule,
  EffectsModule.run(CountryEffects),
  EffectsModule.run(CreditRequestEffects),
  EffectsModule.run(NotificationEffects),
  EffectsModule.run(OfferEffects),
  EffectsModule.run(OrderEffects),
  EffectsModule.run(PrizeEffects),
  EffectsModule.run(TicketEffects),
  EffectsModule.run(UIEffects),
  EffectsModule.run(UserEffects),
  FEATURE_MODULES,
  FlexLayoutModule,
  FormInputModule,
  FormsModule,
  IdlePreloadModule.forRoot(),
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  RouterStoreModule.connectRouter(),
  SelectInputModule,
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TextareaInputModule,
  TransferHttpModule
];
