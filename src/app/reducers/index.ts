import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import userReducer, * as fromUser from './user';

export interface AppState {
    user: fromUser.UserState
}

export default compose(storeLogger(), combineReducers) ({
    user: userReducer
});

export function getUserState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.user);
}

export function getUserEntities() {
    return compose(fromUser.getUserEntities(), getUserState());
}

