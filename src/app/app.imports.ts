import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { FacebookModule } from 'ngx-facebook';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import { FormInputModule } from './components/input-fields/form-input';
import { SelectInputModule } from './components/input-fields/select-input';
import { TextareaInputModule } from './components/input-fields/textarea-input';
import { CountryEffects } from './effects/country';
import { LoggingEffects } from './effects/logging';
import { NotificationEffects } from './effects/notification';
import { OfferEffects } from './effects/offer';
import { OrderEffects } from './effects/order';
import { PrizeEffects } from './effects/prize';
import { RouterEffects } from './effects/router';
import { UIEffects } from './effects/ui';
import { UserEffects } from './effects/user';
import { FEATURE_MODULES } from './features';
import { CreditRequestEffects } from './features/support/credit-request.effects';
import { TicketEffects } from './features/support/ticket.effects';
import { MATERIAL_MODULES } from './material.modules';
import { CustomPipesModule } from './pipes';
import { AppState, DEV_REDUCERS, reducers, resetOnLogout } from './reducers';

export const metaReducers: MetaReducer<AppState>[] =
  ENV === 'development' ? [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  CustomPipesModule,
  EffectsModule.forRoot([
    CountryEffects,
    CreditRequestEffects,
    LoggingEffects,
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
  MATERIAL_MODULES,
  ReactiveFormsModule,
  SelectInputModule,
  StoreRouterConnectingModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  TextareaInputModule,
  TransferHttpModule
];
