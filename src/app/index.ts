export * from './app.component.ts';

import { AuthGuard, LoggedInRedirectGuard } from '../app/guards';
import { RESOLVE_DATA } from './resolve';
// export * from './app-state.service.ts';

// import {AppState} from './app-state.service.ts';
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  AuthGuard,
  LoggedInRedirectGuard,
  ...RESOLVE_DATA
];
