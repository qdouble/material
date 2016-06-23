import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { TestRequestActions } from '../actions';

export interface TestRequestState {
    allUsers: any;
};

const initialState: TestRequestState = {
    allUsers: {}
}

export default function(state = initialState, action: Action): TestRequestState {
    switch (action.type) {

        case TestRequestActions.SHOW_ALL_USERS:
            return Object.assign({}, state, {
                loading: true
            });

        case TestRequestActions.SHOW_ALL_USERS_FAIL:
            return Object.assign({}, state, {
                loading: false
            });

        case TestRequestActions.SHOW_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                allUsers: action.payload,
                loading: false
            });

        default: {
            return state;
        }
    }
}

export function getAllUser() {
    return (state$: Observable<TestRequestState>) => state$
        .select(s => s.allUsers)
}