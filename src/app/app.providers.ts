import { Actions } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';

import { CreditRequestService } from './features/support/credit-request.service';
import { TicketService } from './features/support/ticket.service';

import { AuthGuard, AuthRegGuard, LoggedInRedirectGuard } from './guards';
import { RESOLVE_DATA } from './resolve';
import { services } from './services';
import { ScriptService } from './script.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const TEMP_IMPORTS = [CreditRequestService, TicketService];
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  Actions,
  AuthGuard,
  AuthRegGuard,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA,
  services,
  ScriptService,
  TEMP_IMPORTS,
  TransferState,
  { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
];
