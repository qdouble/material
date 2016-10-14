import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { TicketEffects } from './effects/ticket';
import { UserEffects } from './effects/user';
import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';

export const APP_IMPORTS = [
  EffectsModule.run(TicketEffects),
  EffectsModule.run(UserEffects),
  FormsModule,
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes),
  RouterStoreModule.connectRouter(),
  StoreDevToolsModule,
  StoreModule.provideStore(rootReducer)
];
