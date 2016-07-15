import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';

import userReducer, * as fromUser from './user';
import testRequestReducer, * as fromTestRequests from './test-requests';

export interface AppState {
    user: fromUser.UserState;
    testRequests: fromTestRequests.TestRequestState;
}

export default compose(
    storeLogger(),
    combineReducers
    ) ({
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
