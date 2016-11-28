/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UIActions } from '../actions/ui';

export interface UIState {
  mobile: boolean;
  sideNavOpen: boolean;
};

export const initialState: UIState = {
  mobile: false,
  sideNavOpen: false
};

export function uiReducer(state = initialState, action: Action): UIState {
  switch (action.type) {

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

export function getUIMobile() {
  return compose(_getMobile(), _getUIState());
}

export function getUISideNavOpen() {
  return compose(_getSideNavOpen(), _getUIState());
}
