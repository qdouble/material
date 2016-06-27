export * from './app.component.ts';

import { RouterPatch } from '../app/effects';
import { AuthGuard, LoggedInRedirectGuard } from '../app/guards';
// export * from './app-state.service.ts';

// import {AppState} from './app-state.service.ts';
/*
 This is where you would add your custom application providers.
*/
export const APP_PROVIDERS = [
  AuthGuard,
  LoggedInRedirectGuard,
  RouterPatch
];
