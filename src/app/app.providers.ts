import { Actions } from '@ngrx/effects';

import { CreditRequestActions } from './features/support/credit-request.actions';
import { CreditRequestService } from './features/support/credit-request.service';
import { TicketActions } from './features/support/ticket.actions';
import { TicketService } from './features/support/ticket.service';

import { AuthGuard, 
  AuthRegGuard, 
  LoggedInRedirectGuard } from '../app/guards';
import { RESOLVE_DATA } from './resolve';
import { services } from './services';
import { actions } from './actions';

const TEMP_IMPORTS = [
  CreditRequestActions,
  CreditRequestService,
  TicketActions,
  TicketService
];
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  actions,
  Actions,
  AuthGuard,
  AuthRegGuard,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA,
  services,
  TEMP_IMPORTS
];
