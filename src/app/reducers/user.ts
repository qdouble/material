/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UserActions } from '../actions/user';
import { User } from '../models/user';

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

function _getEntryEmail() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.entryEmail);
}

function _getLoaded() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loading);
}

function _getLoginChecked() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loginChecked);
}

function _getLoggedIn() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loggedIn);
}

function _getReferredBy() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referredBy);
}

function _getUser() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.user);
}

function _getUserState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.user);
}

export function getUser() {
  return compose(_getUser(), _getUserState());
}

export function getUserEntryEmail() {
  return compose(_getEntryEmail(), _getUserState());
}

export function getUserLoaded() {
  return compose(_getLoaded(), _getUserState());
}

export function getUserLoading() {
  return compose(_getLoading(), _getUserState());
}

export function getUserLoginChecked() {
  return compose(_getLoginChecked(), _getUserState());
}

export function getUserLoggedIn() {
  return compose(_getLoggedIn(), _getUserState());
}

export function getUserReferredBy() {
  return compose(_getReferredBy(), _getUserState());
}
