import { Actions } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';

import { CreditRequestService } from './features/support/credit-request.service';
import { TicketService } from './features/support/ticket.service';

import {
  AuthGuard,
  AuthRegGuard,
  LoggedInRedirectGuard
} from './guards';
import { RESOLVE_DATA } from './resolve';
import { services } from './services';

const TEMP_IMPORTS = [
  CreditRequestService,
  TicketService
];
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
  TEMP_IMPORTS,
  TransferState,
  { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
];
