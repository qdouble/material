import { Actions } from '@ngrx/effects';

import { AuthGuard, LoggedInRedirectGuard } from '../app/guards';
import { RESOLVE_DATA } from './resolve';
import { services } from './services';
import { actions } from './actions';
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  actions,
  Actions,
  AuthGuard,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA,
  services
];
