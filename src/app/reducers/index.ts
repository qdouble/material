import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import { compareOrder } from '../helper';
import prizeReducer, * as fromPrize from './prize';
import userReducer, * as fromUser from './user';
import testRequestReducer, * as fromTestRequests from './test-requests';

export interface AppState {
    prize: fromPrize.PrizeState;
    user: fromUser.UserState;
    testRequests: fromTestRequests.TestRequestState;
}

export default compose(
    storeLogger(),
    combineReducers
    ) ({
    prize: prizeReducer,
    user: userReducer,
    testRequests: testRequestReducer
});

export function getPrizeState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.prize);
}

export function getUserState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.user);
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
