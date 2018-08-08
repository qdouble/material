import { ErrorHandler } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TransferState } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CreditRequestService } from './features/support/credit-request.service';
import { TicketService } from './features/support/ticket.service';
import { GlobalErrorHandler } from './global-error-handler';
import { AuthGuard, AuthRegGuard, LoggedInRedirectGuard } from './guards';
import { CustomRouterStateSerializer } from './reducers/index';
import { RESOLVE_DATA } from './resolve';
import { ScriptService } from './script.service';
import { services } from './services';
import { LoggingService } from './services/logging';

const TEMP_IMPORTS = [CreditRequestService, TicketService];
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  services,
  LoggingService,
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  },
  Actions,
  AuthGuard,
  AuthRegGuard,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA,
  ScriptService,
  TEMP_IMPORTS,
  TransferState,
  { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
];
