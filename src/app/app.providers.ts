import { AuthGuard, LoggedInRedirectGuard } from '../app/guards';
import { Actions } from '@ngrx/effects';
import { RESOLVE_DATA } from './resolve';
import { effects } from './effects';
import { services } from './services';
import { actions } from './actions';
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  actions,
  Actions,
  AuthGuard,
  effects,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA,
  services
];
