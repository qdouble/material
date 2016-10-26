import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { notifyReducer, NotifyState } from './notify';
import { offerReducer, OfferState } from './offer';
import { prizeReducer, PrizeState } from './prize';

import { ticketReducer, TicketState } from './ticket';
import { userReducer, UserState } from './user';

export interface AppState {
  notify: NotifyState;
  offer: OfferState;
  prize: PrizeState;
  router: RouterState;
  ticket: TicketState;
  user: UserState;
}

export const reducers = {
  notify: notifyReducer,
  offer: offerReducer,
  prize: prizeReducer,
  router: routerReducer,
  ticket: ticketReducer,
  user: userReducer
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const DEV_REDUCERS = [stateSetter, storeFreeze];
if (['logger', 'both'].includes(STORE_DEV_TOOLS)) { // set in constants.js file of project root
    DEV_REDUCERS.push(storeLogger());
}

const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function rootReducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
