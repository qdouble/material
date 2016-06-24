import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import userReducer, * as fromUser from './user';
import testRequestReducer, * as fromTestRequests from './test-requests';

export interface AppState {
    router: RouterState,
    user: fromUser.UserState,
    testRequests: fromTestRequests.TestRequestState
}

export default compose(storeLogger(), combineReducers) ({
    router: routerReducer,
    user: userReducer,
    testRequests: testRequestReducer
});

export function getUserState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.user);
}

export function getTestRequestState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.testRequests);
}

export function getTestRequestGetAffiliates() {
    return compose(fromTestRequests.getAffiliates(), getTestRequestState())
}

export function getTestRequestAllUsers() {
    return compose(fromTestRequests.getAllUser(), getTestRequestState())
}


export function getUser() {
    return compose(fromUser.getUser(), getUserState());
}

export function getUserLoaded() {
    return compose(fromUser.getLoaded(), getUserState());
}

export function getUserLoading() {
    return compose(fromUser.getLoading(), getUserState());
}

export function getUserEntities() {
    return compose(fromUser.getUserEntities(), getUserState());
}

