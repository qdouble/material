/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Offer } from '../models/offer';
import { PushNotification } from '../models/push-notification';

@Injectable()

export class UIActions {
  static CONTACT_US = '[UI] Contact Us';
  contactUs(contact: { email: string, subject: string, question: string }): Action {
    return {
      type: UIActions.CONTACT_US,
      payload: contact
    };
  }

  static ADD_USER_ID_TO_SOCKET = '[UI] Add User ID to Socket';
  addUserIDToSocket(id: string): Action {
    return {
      type: UIActions.ADD_USER_ID_TO_SOCKET,
      payload: id
    };
  }

  static ADD_USER_ID_TO_SOCKET_FAIL = '[UI] Add User ID to Socket Fail';
  addUserIDToSocketFail(err: Error): Action {
    return {
      type: UIActions.ADD_USER_ID_TO_SOCKET_FAIL,
      payload: err
    };
  }

  static ADD_USER_ID_TO_SOCKET_SUCCESS = '[UI] Add User ID to Socket Success';
  addUserIDToSocketSuccess(res: any): Action {
    return {
      type: UIActions.ADD_USER_ID_TO_SOCKET_SUCCESS,
      payload: res
    };
  }

  static CONTACT_US_FAIL = '[UI] Contact Us Fail';
  contactUsFail(err: Error): Action {
    return {
      type: UIActions.CONTACT_US_FAIL,
      payload: err
    };
  }

  static CONTACT_US_SUCCESS = '[UI] Contact Us Success';
  contactUsSuccess(version: { version: string }): Action {
    return {
      type: UIActions.CONTACT_US_SUCCESS,
      payload: version
    };
  }

  static CREATE_PUSH_NOTIFICATION = '[UI] Create Push Notification';
  createPushNotification(push: PushNotification): Action {
    return {
      type: UIActions.CONTACT_US_SUCCESS,
      payload: push
    };
  }

  static DISPLAY_CREDITED_OFFER_DIALOG = '[UI] Display Credited Offer Dialog';
  displayCreditedOfferDialog(offer: Offer): Action {
    return {
      type: UIActions.DISPLAY_CREDITED_OFFER_DIALOG,
      payload: offer
    };
  }

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

  static MARK_CREDITED_OFFER_AS_VIEWED = '[UI] Mark Credited Offer As Viewed';
  markCreditedOfferAsViewed(id: string): Action {
    return {
      type: UIActions.MARK_CREDITED_OFFER_AS_VIEWED,
      payload: id
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
