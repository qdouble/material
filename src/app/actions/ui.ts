/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()

export class UIActions {
  static SET_MOBILE = '[UI] Set Mobile';
  setMobile(mobile: boolean): Action {
    return {
      type: UIActions.SET_MOBILE,
      payload: mobile
    };
  }
  static TOGGLE_SIDE_NAV_OPEN = '[UI] Toggle SideNav Open';
  toggleSideNavOpen(): Action {
    return {
      type: UIActions.TOGGLE_SIDE_NAV_OPEN
    };
  }
}
