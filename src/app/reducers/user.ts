import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { User } from '../models';
import { UserActions } from '../actions';

export interface UserState {
    ids: string[];
    entities: { [id: string]: User};
    loading: boolean;
    loggedIn: boolean;
};

const initialState: UserState = {
    ids: [],
    entities: {},
    loading: false,
    loggedIn: false
}

export default function(state = initialState, action: Action): UserState {
    switch (action.type) {
        case UserActions.CHECK_EMAIL:
            const check = action.payload;

            return Object.assign(state, {
                check, loading: true
            });
        case UserActions.CHECK_EMAIL_FAIL : {
            const check = action.payload;

        }
        case UserActions.CHECK_EMAIL_SUCCESS : {
            const check = action.payload;

        }
        case UserActions.LOG_MESSAGE:
            return state;
        case UserActions.LOGIN:
        case UserActions.LOGOUT:
        default: {
            return state;
        }
    }
}

export function getUserEntities() {
    return (state$: Observable<UserState>) => state$
        .select(s => s.entities);
}