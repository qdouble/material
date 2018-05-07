import { Action } from '@ngrx/store';

import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { PushNotification } from '../models/push-notification';
import {
  ContactUsResponse,
  GetVersionResponse,
  GetScriptsToLoadResponse,
  GetIPInfoResponse,
  GetIPResponse,
  GetSocialProofResponse,
  SocialProofSettings
} from '../models/ui';

export enum UIActionTypes {
  AddInvalidCountry = '[UI] Add Invalid Country',
  AddInvalidCountryFail = '[UI] Add Invalid Country Fail',
  AddInvalidCountrySuccess = '[UI] Add Invalid Country Success',
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
  GetIPInfo = '[UI] Get IP Info',
  GetIPInfoFail = '[UI] Get IP Info Fail',
  GetIPInfoSuccess = '[UI] Get IP Info Success',
  GetScriptsToLoad = '[UI] Get Scripts To Load',
  GetScriptsToLoadFail = '[UI] Get Scripts To Load Fail',
  GetScriptsToLoadSuccess = '[UI] Get Scripts To Load Success',
  GetSocialProof = '[UI] Get Social Proof',
  GetSocialProofFail = '[UI] Get Social Proof Fail',
  GetSocialProofSuccess = '[UI] Get Social Proof Success',
  GetSocialProofSettings = '[UI] Get Social Proof Settings',
  GetSocialProofSettingsFail = '[UI] Get Social Proof Settings Fail',
  GetSocialProofSettingsSuccess = '[UI] Get Social Proof Settings Success',
  GetVersion = '[UI] Get Version',
  GetVersionFail = '[UI] Get Version Fail',
  GetVersionSuccess = '[UI] Get Version Success',
  MarkCompletedOrderAsViewed = '[UI] Mark Completed Order As Viewed',
  MarkCreditedOfferAsViewed = '[UI] Mark Credited Offer As Viewed',
  OverrideInvalidCountry = '[UI] Override Invalid Country',
  SetMobile = '[UI] Set Mobile',
  ToggleSideNavOpen = '[UI] Toggle SideNav Open'
}

export class AddInvalidCountry implements Action {
  readonly type = UIActionTypes.AddInvalidCountry;

  constructor(public payload: GetIPInfoResponse) { }
}

export class AddInvalidCountryFail implements Action {
  readonly type = UIActionTypes.AddInvalidCountryFail;

  constructor(public payload: Error) { }
}

export class AddInvalidCountrySuccess implements Action {
  readonly type = UIActionTypes.AddInvalidCountrySuccess;

  constructor(public payload: { override?: string }) { }
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

export class GetIPInfo implements Action {
  readonly type = UIActionTypes.GetIPInfo;

  constructor(public payload: string) { }
}

export class GetIPInfoFail implements Action {
  readonly type = UIActionTypes.GetIPInfoFail;

  constructor(public payload: Error) { }
}

export class GetIPInfoSuccess implements Action {
  readonly type = UIActionTypes.GetIPInfoSuccess;

  constructor(public payload: GetIPInfoResponse) { }
}

export class GetScriptsToLoad implements Action {
  readonly type = UIActionTypes.GetScriptsToLoad;
}

export class GetScriptsToLoadFail implements Action {
  readonly type = UIActionTypes.GetScriptsToLoadFail;

  constructor(public payload: Error) { }
}

export class GetScriptsToLoadSuccess implements Action {
  readonly type = UIActionTypes.GetScriptsToLoadSuccess;

  constructor(public payload: GetScriptsToLoadResponse) { }
}

export class GetSocialProof implements Action {
  readonly type = UIActionTypes.GetSocialProof;

  constructor() { }
}

export class GetSocialProofFail implements Action {
  readonly type = UIActionTypes.GetSocialProofFail;

  constructor(public payload: Error) { }
}

export class GetSocialProofSuccess implements Action {
  readonly type = UIActionTypes.GetSocialProofSuccess;

  constructor(public payload: GetSocialProofResponse) { }
}

export class GetSocialProofSettings implements Action {
  readonly type = UIActionTypes.GetSocialProofSettings;

  constructor() { }
}

export class GetSocialProofSettingsFail implements Action {
  readonly type = UIActionTypes.GetSocialProofSettingsFail;

  constructor(public payload: Error) { }
}

export class GetSocialProofSettingsSuccess implements Action {
  readonly type = UIActionTypes.GetSocialProofSettingsSuccess;

  constructor(public payload: SocialProofSettings) { }
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

export class OverrideInvalidCountry implements Action {
  readonly type = UIActionTypes.OverrideInvalidCountry;

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
  | AddInvalidCountry
  | AddInvalidCountryFail
  | AddInvalidCountrySuccess
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
  | GetIPInfo
  | GetIPInfoFail
  | GetIPInfoSuccess
  | GetScriptsToLoad
  | GetScriptsToLoadFail
  | GetScriptsToLoadSuccess
  | GetSocialProof
  | GetSocialProofFail
  | GetSocialProofSuccess
  | GetSocialProofSettings
  | GetSocialProofSettingsFail
  | GetSocialProofSettingsSuccess
  | GetVersion
  | GetVersionFail
  | GetVersionSuccess
  | MarkCompletedOrderAsViewed
  | MarkCreditedOfferAsViewed
  | OverrideInvalidCountry
  | SetMobile
  | ToggleSideNavOpen;
