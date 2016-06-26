import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { User } from '../models';
import { UserActions } from '../actions';

export interface UserState {
  entryEmail: string;
  loading: boolean;
  loaded: boolean;
  user: User
};

const initialState: UserState = {
  entryEmail: null,
  loading: false,
  loaded: false,
  user: {}
}

export default function (state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.CHECK_EMAIL:
      return Object.assign({}, state, {
        entryEmail: action.payload,
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

    case UserActions.LOGIN_SUCCESS:
      if (action.payload.user) {
        return Object.assign({}, state, {
          loaded: true
        })
      }

      return state;


    case UserActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);

    case UserActions.UPDATE_PROFILE:
      return Object.assign({}, state, {
        loading: true
      });

    case UserActions.UPDATE_PROFILE_FAIL:
      return Object.assign({}, state, {
        loading: false
      });

    case UserActions.UPDATE_PROFILE_SUCCESS:
      const res = action.payload;

      if (res.user) {
        return Object.assign({}, state, {
          loading: false,
          user: res.user
        });
      }

      return Object.assign({}, state, {
        loading: false,
        user: Object.assign({}, state.user)
      });

    case UserActions.REGISTER:
      return Object.assign({}, state, {
        loading: true
      })

    case UserActions.REGISTER_FAIL:
      return Object.assign({}, state, {
        loading: false
      })

    case UserActions.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      })

    default: {
      return state;
    }
  }
}

export function getEntryEmail() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.entryEmail)
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
