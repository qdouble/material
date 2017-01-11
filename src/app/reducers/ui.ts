/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UIActions } from '../actions/ui';

export interface UIState {
  contactRequestSent: boolean;
  mobile: boolean;
  sendingContact: boolean;
  sideNavOpen: boolean;
  latestVersion: string;
  version: string;
};

export const initialState: UIState = {
  contactRequestSent: false,
  mobile: false,
  sendingContact: false,
  sideNavOpen: false,
  latestVersion: null,
  version: '0.0.48'
};

export function uiReducer(state = initialState, action: Action): UIState {
  switch (action.type) {

    case UIActions.CONTACT_US:
      return Object.assign({}, state, {
        contactRequestSent: false,
        sendingContact: true
      });

    case UIActions.CONTACT_US:
      return Object.assign({}, state, { sendingContact: false });

    case UIActions.CONTACT_US_SUCCESS:
      if (!action.payload.success) return Object.assign({});
      return Object.assign({}, state, {
        contactRequestSent: true,
        sendingContact: false
      });

    case UIActions.GET_VERSION_SUCCESS:
      let version = action.payload.version;
      if (!version || typeof version !== 'string') return state;
      return Object.assign({}, state, {
        latestVersion: action.payload.version
      });

    case UIActions.SET_MOBILE:
      return Object.assign({}, state, {
        mobile: action.payload,
        sideNavOpen: !action.payload
      });

    case UIActions.TOGGLE_SIDE_NAV_OPEN:
      return Object.assign({}, state, {
        sideNavOpen: !state.sideNavOpen,
      });

    default: {
      return state;
    }
  }
}

function _getLatestVersion() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.latestVersion);
}

function _getMobile() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.mobile);
}

function _getSideNavOpen() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.sideNavOpen);
}

function _getUIState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.ui);
}

function _getVersion() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.version);
}

export function getUILatestVersion() {
  return compose(_getLatestVersion(), _getUIState());
}

export function getUIMobile() {
  return compose(_getMobile(), _getUIState());
}

export function getUISideNavOpen() {
  return compose(_getSideNavOpen(), _getUIState());
}

export function getUIVersion() {
  return compose(_getVersion(), _getUIState());
}
