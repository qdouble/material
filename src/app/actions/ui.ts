/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()

export class UIActions {
  static GET_VERSION = '[UI] Get Version';
  getVersion(): Action {
    return {
      type: UIActions.GET_VERSION
    };
  }

  static GET_VERSION_FAIL = '[UI] Get Version Fail';
  getVersionFail(err: Error): Action {
    return {
      type: UIActions.GET_VERSION_FAIL,
      payload: err
    };
  }

  static GET_VERSION_SUCCESS = '[UI] Get Version Success';
  getVersionSuccess(version: { version: string }): Action {
    return {
      type: UIActions.GET_VERSION_SUCCESS,
      payload: version
    };
  }

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
