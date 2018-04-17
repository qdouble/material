import { Action } from '@ngrx/store';

import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { PushNotification } from '../models/push-notification';
import { ContactUsResponse, GetVersionResponse } from '../models/ui';

export enum UIActionTypes {
  AddUserIDToSocket = '[UI] Add User ID to Socket',
  AddUserIDToSocketFail = '[UI] Add User ID to Socket Fail',
  AddUserIDToSocketSuccess = '[UI] Add User ID to Socket Success',
  ContactUs = '[UI] Contact Us',
  ContactUsFail = '[UI] Contact Us Fail',
  ContactUsSuccess = '[UI] Contact Us Success',
  CreatePushNotification = '[UI] Create Push Notification',
  CreatePushNotificationFail = '[UI] Create Push Notification Fail',
  CreatePushNotificationSuccess = '[UI] Create Push Notification Success',
  DisplayCompletedOrderDialog = '[UI] Display Completed Order Dialog',
  DisplayCreditedOfferDialog = '[UI] Display Credited Offer Dialog',
  DisplayUnconfirmedCreditDialog = '[UI] Display Unconfirmed Credit Dialog',
  GetVersion = '[UI] Get Version',
  GetVersionFail = '[UI] Get Version Fail',
  GetVersionSuccess = '[UI] Get Version Success',
  MarkCompletedOrderAsViewed = '[UI] Mark Completed Order As Viewed',
  MarkCreditedOfferAsViewed = '[UI] Mark Credited Offer As Viewed',
  SetMobile = '[UI] Set Mobile',
  ToggleSideNavOpen = '[UI] Toggle SideNav Open'
}

export class AddUserIDToSocket implements Action {
  readonly type = UIActionTypes.AddUserIDToSocket;

  constructor(public payload: string) { }
}

export class AddUserIDToSocketFail implements Action {
  readonly type = UIActionTypes.AddUserIDToSocketFail;

  constructor(public payload: Error) { }
}

export class AddUserIDToSocketSuccess implements Action {
  readonly type = UIActionTypes.AddUserIDToSocketSuccess;

  constructor(public payload: string) { }
}

export class ContactUs implements Action {
  readonly type = UIActionTypes.ContactUs;

  constructor(public payload: { email: string, subject: string, question: string }) { }
}

export class ContactUsFail implements Action {
  readonly type = UIActionTypes.ContactUsFail;

  constructor(public payload: Error) { }
}

export class ContactUsSuccess implements Action {
  readonly type = UIActionTypes.ContactUsSuccess;

  constructor(public payload: ContactUsResponse) { }
}

export class CreatePushNotification implements Action {
  readonly type = UIActionTypes.CreatePushNotification;

  constructor(public payload: PushNotification) { }
}

export class DisplayCompletedOrderDialog implements Action {
  readonly type = UIActionTypes.DisplayCompletedOrderDialog;

  constructor(public payload: { order: Order }) { }
}

export class DisplayCreditedOfferDialog implements Action {
  readonly type = UIActionTypes.DisplayCreditedOfferDialog;

  constructor(public payload: { offer: Offer }) { }
}

export class DisplayUnconfirmedCreditDialog implements Action {
  readonly type = UIActionTypes.DisplayUnconfirmedCreditDialog;

  constructor(public payload: { offer: Offer }) { }
}

export class GetVersion implements Action {
  readonly type = UIActionTypes.GetVersion;
}

export class GetVersionFail implements Action {
  readonly type = UIActionTypes.GetVersionFail;

  constructor(public payload: Error) { }
}

export class GetVersionSuccess implements Action {
  readonly type = UIActionTypes.GetVersionSuccess;

  constructor(public payload: GetVersionResponse) { }
}

export class MarkCompletedOrderAsViewed implements Action {
  readonly type = UIActionTypes.MarkCompletedOrderAsViewed;

  constructor(public payload: string) { }
}

export class MarkCreditedOfferAsViewed implements Action {
  readonly type = UIActionTypes.MarkCreditedOfferAsViewed;

  constructor(public payload: string) { }
}

export class SetMobile implements Action {
  readonly type = UIActionTypes.SetMobile;

  constructor(public payload: boolean) { }
}

export class ToggleSideNavOpen implements Action {
  readonly type = UIActionTypes.ToggleSideNavOpen;
}

export type UIActions =
  | AddUserIDToSocket
  | AddUserIDToSocketFail
  | AddUserIDToSocketSuccess
  | ContactUs
  | ContactUsFail
  | ContactUsSuccess
  | CreatePushNotification
  | DisplayCompletedOrderDialog
  | DisplayCreditedOfferDialog
  | DisplayUnconfirmedCreditDialog
  | GetVersion
  | GetVersionFail
  | GetVersionSuccess
  | MarkCompletedOrderAsViewed
  | MarkCreditedOfferAsViewed
  | SetMobile
  | ToggleSideNavOpen;
