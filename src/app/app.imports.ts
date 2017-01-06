import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { FEATURE_MODULES } from './features';
import { SelectInputModule } from './components/input-fields/select-input';
import { TextareaInputModule } from './components/input-fields/textarea-input';

import { routes } from './app.routing';
import { CountryEffects } from './effects/country';
import { OfferEffects } from './effects/offer';
import { OrderEffects } from './effects/order';
import { PrizeEffects } from './effects/prize';
import { UIEffects } from './effects/ui';
import { UserEffects } from './effects/user';
import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';

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
  EffectsModule.run(CountryEffects),
  EffectsModule.run(OfferEffects),
  EffectsModule.run(OrderEffects),
  EffectsModule.run(PrizeEffects),
  EffectsModule.run(UIEffects),
  EffectsModule.run(UserEffects),
  FEATURE_MODULES,
  FlexLayoutModule.forRoot(),
  FormsModule,
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes),
  RouterStoreModule.connectRouter(),
  SelectInputModule,
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TextareaInputModule
];
