import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { compareOrder } from '../helper';

import { offerReducer, OfferState } from './offer';
import { prizeReducer, PrizeState } from './prize';
import { testRequestReducer, TestRequestState } from './test-requests';

import * as fromOffer from './offer';
import * as fromPrize from './prize';
import * as fromUser from './user';
import * as fromTestRequests from './test-requests';
import { userReducer, UserState } from './user';

export interface AppState {
  offer: OfferState;
  prize: PrizeState;
  router: RouterState;
  testRequests: TestRequestState;
  user: UserState;
}

export const reducers = {
  offer: offerReducer,
  prize: prizeReducer,
  testRequests: testRequestReducer,
  router: routerReducer,
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

export function getOfferState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.offer);
}

export function getPrizeState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.prize);
}

export function getUserState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.user);
}

export function getOffers(offerIds: string[]) {
  return compose(fromOffer.getOffers(offerIds), getOfferState());
}

export function getOfferIds() {
  return compose(fromOffer.getOfferIds(), getOfferState());
}

export function getOfferEntities() {
  return compose(fromOffer.getOfferEntities(), getOfferState());
}

export function getOfferLoaded() {
  return compose(fromOffer.getLoaded(), getOfferState());
}

export function getOfferLoading() {
  return compose(fromOffer.getLoading(), getOfferState());
}

export function getOfferSelected() {
  return compose(fromOffer.getSelectedOffer(), getOfferState());
}

export function getOfferCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getOfferIds())
    .switchMap(offerId => state$.let(getOffers(offerId)));
}

export function getPrizes(prizeIds: string[]) {
  return compose(fromPrize.getPrizes(prizeIds), getPrizeState());
}

export function getPrizeIds() {
  return compose(fromPrize.getPrizeIds(), getPrizeState());
}

export function getPrizeEntities() {
  return compose(fromPrize.getPrizeEntities(), getPrizeState());
}

export function getPrizeLoaded() {
  return compose(fromPrize.getLoaded(), getPrizeState());
}

export function getPrizeLoading() {
  return compose(fromPrize.getLoading(), getPrizeState());
}

export function getPrizeSelected() {
  return compose(fromPrize.getSelectedPrize(), getPrizeState());
}

export function getPrizeCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getPrizeIds())
    .switchMap(prizeId => state$.let(getPrizes(prizeId)))
    .map(arr => arr.sort(compareOrder));
}

export function getTestRequestState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.testRequests);
}

export function getTestRequestGetAffiliates() {
  return compose(fromTestRequests.getAffiliates(), getTestRequestState());
}

export function getTestRequestAllUsers() {
  return compose(fromTestRequests.getAllUser(), getTestRequestState());
}

export function getUser() {
  return compose(fromUser.getUser(), getUserState());
}

export function getUserEntryEmail() {
  return compose(fromUser.getEntryEmail(), getUserState());
}

export function getUserLoaded() {
  return compose(fromUser.getLoaded(), getUserState());
}

export function getUserLoading() {
  return compose(fromUser.getLoading(), getUserState());
}

export function getUserLoginChecked() {
  return compose(fromUser.getLoginChecked(), getUserState());
}

export function getUserLoggedIn() {
  return compose(fromUser.getLoggedIn(), getUserState());
}

export function getUserReferredBy() {
  return compose(fromUser.getReferredBy(), getUserState());
}
