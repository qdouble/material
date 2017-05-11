import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';

import * as fromCountry from './country';
import * as fromCreditRequest from './credit-request';
import * as fromNotification from './notification';
import * as fromNotify from './notify';
import * as fromOffer from './offer';
import * as fromOrder from './order';
import * as fromPrize from './prize';
import * as fromTicket from './ticket';
import * as fromUi from './ui';
import * as fromUser from './user';

const modules = {
  'country': fromCountry,
  'creditRequest': fromCreditRequest,
  'notification': fromNotification,
  'notify' : fromNotify,
  'offer': fromOffer,
  'order': fromOrder,
  'prize': fromPrize,
  'ticket': fromTicket,
  'ui': fromUi,
  'user': fromUser
};

export interface AppState {
  country: fromCountry.CountryState;
  creditRequest: fromCreditRequest.CreditRequestState;
  notification: fromNotification.NotificationState;
  notify: fromNotify.NotifyState;
  offer: fromOffer.OfferState;
  order: fromOrder.OrderState;
  prize: fromPrize.PrizeState;
  router: RouterState;
  ticket: fromTicket.TicketState;
  ui: fromUi.UIState;
  user: fromUser.UserState;
}

export const syncReducers = {
  country: fromCountry.countryReducer,
  creditRequest: fromCreditRequest.creditRequestReducer,
  notification: fromNotification.notificationReducer,
  notify: fromNotify.notifyReducer,
  offer: fromOffer.offerReducer,
  order: fromOrder.orderReducer,
  prize: fromPrize.prizeReducer,
  router: routerReducer,
  ticket: fromTicket.ticketReducer,
  ui: fromUi.uiReducer,
  user: fromUser.userReducer
};

const deepCombineReducers = (allReducers: any) => {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
};

const createReducer = (asyncReducers = {}) => {
  let allReducers = { ...syncReducers, ...asyncReducers };
  return deepCombineReducers(allReducers);
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

const resetOnLogout = (reducer: Function) => {
  return function (state, action) {
    let newState;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key]['initialState'];
      });
    }
    return reducer(newState || state, action);
  };
};

const DEV_REDUCERS = [stateSetter, storeFreeze];
if (['logger', 'both'].includes(STORE_DEV_TOOLS)) { // set in constants.js file of project root
  DEV_REDUCERS.push(storeLogger());
}


const developmentReducer = compose(...DEV_REDUCERS, resetOnLogout);
const productionReducer = compose(resetOnLogout);

export function rootReducer(state: any, action: any, asyncReducer) {
  if (ENV !== 'development') {
    return productionReducer(createReducer(asyncReducer))(state, action);
  } else {
    return developmentReducer(createReducer(asyncReducer))(state, action);
  }
};

export function createNewRootReducer(reducer: any): ActionReducer<any> {
  return function (state, action) {
    return rootReducer(state, action, reducer);
  };
}
