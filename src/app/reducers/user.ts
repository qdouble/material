import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { User } from '../models';
import { UserActions } from '../actions';

export interface UserState {
    ids: string[];
    entities: { [id: string]: User };
    loading: boolean;
    loaded: boolean;
    user: { [id: string]: User }
};

const initialState: UserState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    user: {}
}

export default function (state = initialState, action: Action): UserState {
    switch (action.type) {

        case UserActions.CHECK_EMAIL:
            return Object.assign({}, state, {
                loading: true
            });

        case UserActions.CHECK_EMAIL_FAIL: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case UserActions.CHECK_EMAIL_SUCCESS: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case UserActions.GET_PROFILE: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case UserActions.GET_PROFILE_FAIL: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case UserActions.GET_PROFILE_SUCCESS: {
            const user: User = action.payload;


            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                user: user
            });

        }

        case UserActions.LOGIN:

        case UserActions.LOGIN_SUCCESS:

        case UserActions.LOGOUT:

        default: {
            return state;
        }
    }
}


export function getLoaded() {
    return (state$: Observable<UserState>) => state$
        .select(s => s.loaded)
}

export function getLoading() {
    return (state$: Observable<UserState>) => state$
        .select(s => s.loading)
}

export function getUser() {
    return (state$: Observable<UserState>) => state$
        .select(s => s.user);
}

export function getUserEntities() {
    return (state$: Observable<UserState>) => state$
        .select(s => s.entities);
}