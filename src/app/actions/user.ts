/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';

import { Credit } from '../models/credit';
import { Referral } from '../models/referral';
import {
  GetProfileResponse,
  GetReferralResponse,
  HideReferralsResponse,
  RecordClickResponse,
  RemoveReferralsResponse,
  SetSponsorResponse,
  User
} from '../models/user';
import { GenericResponse } from '../models/generic-response';
import { CheckReferrerUsernameResponse, DismissProfileChangesResponse } from '../models/prize';

export enum UserActionTypes {
  AddCredit = '[User] Add Credit',
  AddReferral = '[User] Add Referral',
  AdminLogin = '[User] Admin Login',
  AdminLoginFail = '[User] Admin Login Fail',
  AdminLoginSuccess = '[User] Admin Login Success',
  AskQuestions = '[User] Ask Questions',
  ChangeSelectedPrize = '[User] Change Selected Prize',
  ChangeSelectedPrizeFail = '[User] Change Selected Prize Fail',
  ChangeSelectedPrizeSuccess = '[User] Change Selected Prize Success',
  CheckIfUserUpdated = '[User] Check If User Updated',
  CheckIfUserUpdatedFail = '[User] Check If User Updated Fail',
  CheckIfUserUpdatedSuccess = '[User] Check If User Updated Success',
  CheckIPMatch = '[User] Check IP Match',
  CheckIPMatchFail = '[User] Check IP Match Fail',
  CheckIPMatchSuccess = '[User] Check IP Match Success',
  CheckLoggedIn = '[User] Check Logged In',
  CheckLoggedInFail = '[User] Check Logged In Fail',
  CheckLoggedInSuccess = '[User] Check Logged In Success',
  CheckReferrerUsername = '[User] Check Referrer Username',
  CheckReferrerUsernameFail = '[User] Check Referrer Username Fail',
  CheckReferrerUsernameSuccess = '[User] Check Referrer Username Success',
  DeselectAllReferrals = '[User] Deselect All Referrals',
  DeselectReferrals = '[User] Deselect Referrals',
  DismissProfileChanges = '[User] Dismiss Profile Changes',
  DismissProfileChangesFail = '[User] Dismiss Profile Changes Fail',
  DismissProfileChangesSuccess = '[User] Dismiss Profile Changes Success',
  ForgotPassword = '[User] Forgot Password',
  ForgotPasswordFail = '[User] Forgot Password Fail',
  ForgotPasswordSuccess = '[User] Forgot Password Success',
  GetProfile = '[User] Get Profile',
  GetProfileFail = '[User] Get Profile Fail',
  GetProfileSuccess = '[User] Get Profile Success',
  GetReferral = '[User] Get Referral',
  GetReferralFail = '[User] Get Referral Fail',
  GetReferralSuccess = '[User] Get Referral Success',
  HideReferrals = '[User] Hide Referrals',
  HideReferralsFail = '[User] Hide Referrals Fail',
  HideReferralsSuccess = '[User] Hide Referrals Success',
  Login = '[User] Login',
  LoginFail = '[User] Login Fail',
  LoginSuccess = '[User] Login Success',
  LogMessage = '[User] Log Message',
  Logout = '[User] Logout',
  LogoutFail = '[User] Logout Fail',
  LogoutSuccess = '[User] Logout Success',
  NewEqualTrue = '[User] New Equal True',
  RecordClick = '[User] Record Click',
  RecordClickFail = '[User] Record Click Fail',
  RecordClickSuccess = '[User] Record Click Success',
  Register = '[User] Register',
  RegisterFail = '[User] Register Fail',
  RegisterSuccess = '[User] Register Success',
  RemoveReferrals = '[User] Remove Referrals',
  RemoveReferralsFail = '[User] Remove Referrals Fail',
  RemoveReferralsSuccess = '[User] Remove Referrals Success',
  ResetPassword = '[User] Reset Password',
  ResetPasswordFail = '[User] Reset Password Fail',
  ResetPasswordSuccess = '[User] Reset Password Success',
  ReturningUser = '[User] Returning User',
  SelectPrize = '[User] Select Prize',
  SelectReferrals = '[User] Select Referrals',
  SetAdminLoginPage = '[User] Set Admin Login Page',
  SetAmountPaid = '[User] Set Amount Paid',
  SetCreditTotal = '[User] Set Credit Total',
  SetHasQualifiedReferrals = '[User] Set Has Qualified Referrals',
  SetOrderPending = '[User] Set Order Pending',
  SetReferredBy = '[User] Set Referred By',
  SetSponsor = '[User] Set Sponsor',
  SetSponsorFail = '[User] Set Sponsor Fail',
  SetSponsorSuccess = '[User] Set Sponsor Success',
  ShowLevelBadge = '[User] Show Level Badge',
  SortReferralsBy = '[User] Sort Referrals By',
  TestShowRefRandom = '[User] Test Show Ref Random',
  UpdateCurrentLevel = '[User] Update Current Level',
  UpdateOrderPending = '[User] Update Order Pending',
  UpdateProfile = '[User] Update Profile',
  UpdateProfileFail = '[User] Update Profile Fail',
  UpdateProfileSuccess = '[User] Update Profile Success',
  UpdateHasQualifiedReferrals = '[User] Update Has Qualified Referrals',
  UpdateReferral = '[User] Update Referral'
}

export class AddCredit implements Action {
  readonly type = UserActionTypes.AddCredit;

  constructor(public payload: { credit: Credit }) {}
}

export class AddReferral implements Action {
  readonly type = UserActionTypes.AddReferral;

  constructor(public payload: { referral: Referral }) {}
}

export class AdminLogin implements Action {
  readonly type = UserActionTypes.AdminLogin;

  constructor(public payload: User) {}
}

export class AdminLoginFail implements Action {
  readonly type = UserActionTypes.AdminLoginFail;

  constructor(public payload: Error) {}
}

export class AdminLoginSuccess implements Action {
  readonly type = UserActionTypes.AdminLoginSuccess;

  constructor(public payload: GenericResponse) {}
}

export class AskQuestions implements Action {
  readonly type = UserActionTypes.AskQuestions;
}

export class ChangeSelectedPrize implements Action {
  readonly type = UserActionTypes.ChangeSelectedPrize;

  constructor(public payload: string) {}
}

export class ChangeSelectedPrizeFail implements Action {
  readonly type = UserActionTypes.ChangeSelectedPrizeFail;

  constructor(public payload: Error) {}
}

export class ChangeSelectedPrizeSuccess implements Action {
  readonly type = UserActionTypes.ChangeSelectedPrizeSuccess;

  constructor(public payload: { message: string; message_type: string; id: string }) {}
}

export class CheckIfUserUpdated implements Action {
  readonly type = UserActionTypes.CheckIfUserUpdated;
}

export class CheckIfUserUpdatedFail implements Action {
  readonly type = UserActionTypes.CheckIfUserUpdatedFail;

  constructor(public payload: Error) {}
}

export class CheckIfUserUpdatedSuccess implements Action {
  readonly type = UserActionTypes.CheckIfUserUpdatedSuccess;

  constructor(public payload: { updatedAt: string; message: string }) {}
}

export class CheckIPMatch implements Action {
  readonly type = UserActionTypes.CheckIPMatch;
  constructor(public payload: string) {}
}

export class CheckIPMatchFail implements Action {
  readonly type = UserActionTypes.CheckIPMatchFail;

  constructor(public payload: Error) {}
}

export class CheckIPMatchSuccess implements Action {
  readonly type = UserActionTypes.CheckIPMatchSuccess;

  constructor(public payload: { matches: boolean; ip: string; ipJson: any }) {}
}

export class CheckLoggedIn implements Action {
  readonly type = UserActionTypes.CheckLoggedIn;
}

export class CheckLoggedInFail implements Action {
  readonly type = UserActionTypes.CheckLoggedInFail;

  constructor(public payload: Error) {}
}

export class CheckLoggedInSuccess implements Action {
  readonly type = UserActionTypes.CheckLoggedInSuccess;

  constructor(public payload: string) {}
}

export class CheckReferrerUsername implements Action {
  readonly type = UserActionTypes.CheckReferrerUsername;
  constructor(public payload: string) {}
}

export class CheckReferrerUsernameFail implements Action {
  readonly type = UserActionTypes.CheckReferrerUsernameFail;

  constructor(public payload: Error) {}
}

export class CheckReferrerUsernameSuccess implements Action {
  readonly type = UserActionTypes.CheckReferrerUsernameSuccess;

  constructor(public payload: CheckReferrerUsernameResponse) {}
}

export class DeselectAllReferrals implements Action {
  readonly type = UserActionTypes.DeselectAllReferrals;
}

export class DeselectReferrals implements Action {
  readonly type = UserActionTypes.DeselectReferrals;
  constructor(public payload: string[]) {}
}

export class DismissProfileChanges implements Action {
  readonly type = UserActionTypes.DismissProfileChanges;
}

export class DismissProfileChangesFail implements Action {
  readonly type = UserActionTypes.DismissProfileChangesFail;

  constructor(public payload: Error) {}
}

export class DismissProfileChangesSuccess implements Action {
  readonly type = UserActionTypes.DismissProfileChangesSuccess;

  constructor(public payload: DismissProfileChangesResponse) {}
}

export class ForgotPassword implements Action {
  readonly type = UserActionTypes.ForgotPassword;

  constructor(public payload: string) {}
}

export class ForgotPasswordFail implements Action {
  readonly type = UserActionTypes.ForgotPasswordFail;

  constructor(public payload: Error) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type = UserActionTypes.ForgotPasswordSuccess;

  constructor(public payload: GenericResponse) {}
}

export class GetProfile implements Action {
  readonly type = UserActionTypes.GetProfile;
}

export class GetProfileFail implements Action {
  readonly type = UserActionTypes.GetProfileFail;

  constructor(public payload: Error) {}
}

export class GetProfileSuccess implements Action {
  readonly type = UserActionTypes.GetProfileSuccess;

  constructor(public payload: GetProfileResponse) {}
}

export class GetReferral implements Action {
  readonly type = UserActionTypes.GetReferral;

  constructor(public payload: string) {}
}

export class GetReferralFail implements Action {
  readonly type = UserActionTypes.GetReferralFail;

  constructor(public payload: Error) {}
}

export class GetReferralSuccess implements Action {
  readonly type = UserActionTypes.GetReferralSuccess;

  constructor(public payload: GetReferralResponse) {}
}

export class HideReferrals implements Action {
  readonly type = UserActionTypes.HideReferrals;

  constructor(public payload: { ids: string[]; hide: boolean }) {}
}

export class HideReferralsFail implements Action {
  readonly type = UserActionTypes.HideReferralsFail;

  constructor(public payload: Error) {}
}

export class HideReferralsSuccess implements Action {
  readonly type = UserActionTypes.HideReferralsSuccess;

  constructor(public payload: HideReferralsResponse) {}
}

export class Login implements Action {
  readonly type = UserActionTypes.Login;

  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = UserActionTypes.LoginFail;

  constructor(public payload: Error) {}
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LoginSuccess;

  constructor(public payload: GenericResponse) {}
}

export class LogMessage implements Action {
  readonly type = UserActionTypes.LogMessage;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class LogoutFail implements Action {
  readonly type = UserActionTypes.LogoutFail;

  constructor(public payload: Error) {}
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LogoutSuccess;
}

export class NewEqualTrue implements Action {
  readonly type = UserActionTypes.NewEqualTrue;

  constructor(public payload: boolean) {}
}

export class RecordClick implements Action {
  readonly type = UserActionTypes.RecordClick;

  constructor(public payload: string) {}
}

export class RecordClickFail implements Action {
  readonly type = UserActionTypes.RecordClickFail;

  constructor(public payload: Error) {}
}

export class RecordClickSuccess implements Action {
  readonly type = UserActionTypes.RecordClickSuccess;

  constructor(public payload: RecordClickResponse) {}
}

export class Register implements Action {
  readonly type = UserActionTypes.Register;

  constructor(public payload: User) {}
}

export class RegisterFail implements Action {
  readonly type = UserActionTypes.RegisterFail;

  constructor(public payload: Error) {}
}

export class RegisterSuccess implements Action {
  readonly type = UserActionTypes.RegisterSuccess;

  constructor(public payload: GenericResponse) {}
}

export class RemoveReferrals implements Action {
  readonly type = UserActionTypes.RemoveReferrals;

  constructor(public payload: string[]) {}
}

export class RemoveReferralsFail implements Action {
  readonly type = UserActionTypes.RemoveReferralsFail;

  constructor(public payload: Error) {}
}

export class RemoveReferralsSuccess implements Action {
  readonly type = UserActionTypes.RemoveReferralsSuccess;

  constructor(public payload: RemoveReferralsResponse) {}
}

export class ResetPassword implements Action {
  readonly type = UserActionTypes.ResetPassword;

  constructor(public payload: { email: string; code: string; password: string }) {}
}

export class ResetPasswordFail implements Action {
  readonly type = UserActionTypes.ResetPasswordFail;

  constructor(public payload: Error) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = UserActionTypes.ResetPasswordSuccess;

  constructor(public payload: GenericResponse) {}
}

export class ReturningUser implements Action {
  readonly type = UserActionTypes.ReturningUser;
}

export class SelectPrize implements Action {
  readonly type = UserActionTypes.SelectPrize;

  constructor(public payload: string) {}
}

export class SelectReferrals implements Action {
  readonly type = UserActionTypes.SelectReferrals;

  constructor(public payload: string[]) {}
}

export class SetAdminLoginPage implements Action {
  readonly type = UserActionTypes.SetAdminLoginPage;

  constructor(public payload: boolean) {}
}

export class SetAmountPaid implements Action {
  readonly type = UserActionTypes.SetAmountPaid;

  constructor(public payload: number) {}
}

export class SetCreditTotal implements Action {
  readonly type = UserActionTypes.SetCreditTotal;

  constructor(public payload: number) {}
}

export class SetHasQualifiedReferrals implements Action {
  readonly type = UserActionTypes.SetHasQualifiedReferrals;

  constructor(public payload: boolean) {}
}

export class SetOrderPending implements Action {
  readonly type = UserActionTypes.SetOrderPending;

  constructor(public payload: boolean) {}
}

export class SetReferredBy implements Action {
  readonly type = UserActionTypes.SetReferredBy;

  constructor(public payload: string) {}
}

export class SetSponsor implements Action {
  readonly type = UserActionTypes.SetSponsor;

  constructor(public payload: string) {}
}

export class SetSponsorFail implements Action {
  readonly type = UserActionTypes.SetSponsorFail;

  constructor(public payload: Error) {}
}

export class SetSponsorSuccess implements Action {
  readonly type = UserActionTypes.SetSponsorSuccess;

  constructor(public payload: SetSponsorResponse) {}
}

export class ShowLevelBadge implements Action {
  readonly type = UserActionTypes.ShowLevelBadge;

  constructor(public payload: number) {}
}

export class SortReferralsBy implements Action {
  readonly type = UserActionTypes.SortReferralsBy;

  constructor(public payload: { sortBy: string; reverse: boolean }) {}
}

export class TestShowRefRandom implements Action {
  readonly type = UserActionTypes.TestShowRefRandom;

  constructor(public payload: number) {}
}

export class UpdateCurrentLevel implements Action {
  readonly type = UserActionTypes.UpdateCurrentLevel;

  constructor(public payload: { currentLevel: number; leveledUp: boolean }) {}
}

export class UpdateHasQualifiedReferrals implements Action {
  readonly type = UserActionTypes.UpdateHasQualifiedReferrals;

  constructor(
    public payload: { hasQualifiedReferrals: boolean; hasReferralsBeyondLevel: boolean }
  ) {}
}

export class UpdateOrderPending implements Action {
  readonly type = UserActionTypes.UpdateOrderPending;

  constructor(public payload: boolean) {}
}

export class UpdateProfile implements Action {
  readonly type = UserActionTypes.UpdateProfile;

  constructor(public payload: User) {}
}

export class UpdateProfileFail implements Action {
  readonly type = UserActionTypes.UpdateProfileFail;

  constructor(public payload: Error) {}
}

export class UpdateProfileSuccess implements Action {
  readonly type = UserActionTypes.UpdateProfileSuccess;

  constructor(public payload: GetProfileResponse) {}
}

export class UpdateReferral implements Action {
  readonly type = UserActionTypes.UpdateReferral;

  constructor(public payload: { referral: Referral }) {}
}

export type UserActions =
  | AddCredit
  | AddReferral
  | AdminLogin
  | AdminLoginFail
  | AdminLoginSuccess
  | AskQuestions
  | ChangeSelectedPrize
  | ChangeSelectedPrizeFail
  | ChangeSelectedPrizeSuccess
  | CheckIfUserUpdated
  | CheckIfUserUpdatedFail
  | CheckIfUserUpdatedSuccess
  | CheckIPMatch
  | CheckIPMatchFail
  | CheckIPMatchSuccess
  | CheckLoggedIn
  | CheckLoggedInFail
  | CheckLoggedInSuccess
  | CheckReferrerUsername
  | CheckReferrerUsernameFail
  | CheckReferrerUsernameSuccess
  | DeselectAllReferrals
  | DeselectReferrals
  | DismissProfileChanges
  | DismissProfileChangesFail
  | DismissProfileChangesSuccess
  | ForgotPassword
  | ForgotPasswordFail
  | ForgotPasswordSuccess
  | GetProfile
  | GetProfileFail
  | GetProfileSuccess
  | GetReferral
  | GetReferralFail
  | GetReferralSuccess
  | HideReferrals
  | HideReferralsFail
  | HideReferralsSuccess
  | Login
  | LoginFail
  | LoginSuccess
  | LogMessage
  | Logout
  | LogoutFail
  | LogoutSuccess
  | NewEqualTrue
  | RecordClick
  | RecordClickFail
  | RecordClickSuccess
  | Register
  | RegisterFail
  | RegisterSuccess
  | RemoveReferrals
  | RemoveReferralsFail
  | RemoveReferralsSuccess
  | ResetPassword
  | ResetPasswordFail
  | ResetPasswordSuccess
  | ReturningUser
  | SelectPrize
  | SelectReferrals
  | SetAdminLoginPage
  | SetAmountPaid
  | SetCreditTotal
  | SetHasQualifiedReferrals
  | SetOrderPending
  | SetReferredBy
  | SetSponsor
  | SetSponsorFail
  | SetSponsorSuccess
  | ShowLevelBadge
  | SortReferralsBy
  | TestShowRefRandom
  | UpdateCurrentLevel
  | UpdateOrderPending
  | UpdateProfile
  | UpdateProfileFail
  | UpdateProfileSuccess
  | UpdateHasQualifiedReferrals
  | UpdateReferral;
