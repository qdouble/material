/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { UserActions } from '../actions';
import { User } from '../models';

export interface UserState {
  entryEmail: string | null;
  loading: boolean;
  loaded: boolean;
  loginChecked: boolean;
  loggedIn: boolean | null;
  user: User;
  referredBy: string | null;
};

const initialState: UserState = {
  entryEmail: null,
  loading: false,
  loaded: false,
  loginChecked: false,
  loggedIn: null,
  user: {},
  referredBy: null
};

export function userReducer (state = initialState, action: Action): UserState {
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

    case UserActions.CHECK_LOGGED_IN_SUCCESS: {
      return Object.assign({}, state, {
        loginChecked: true,
        loggedIn: !!action.payload
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
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        user: action.payload
      });
    }

    case UserActions.LOGIN_SUCCESS:
      if (action.payload.message_type === 'success') {
        return Object.assign({}, state, {
          loggedIn: true
        });
      }
      return state;

    case UserActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, Object.assign({}, initialState, {
        loggedIn: false
      }));

    case UserActions.SET_REFERRED_BY:
      return Object.assign({}, state, { referredBy: action.payload });

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
      });

    case UserActions.REGISTER_FAIL:
      return Object.assign({}, state, {
        loading: false
      });

    case UserActions.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loggedIn: action.payload.success
      });

    default: {
      return state;
    }
  }
}

export function getEntryEmail() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.entryEmail);
}

export function getLoaded() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loading);
}

export function getLoginChecked() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loginChecked);
}

export function getLoggedIn() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loggedIn);
}

export function getReferredBy() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referredBy);
}

export function getUser() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.user);
}
