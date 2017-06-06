/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Credit } from '../models/credit';
import { Referral } from '../models/referral';
import { User } from '../models/user';

@Injectable()

export class UserActions {
  static ADD_CREDIT = '[User] Add Credit';
  addCredit(credit: Credit): Action {
    return {
      type: UserActions.ADD_CREDIT,
      payload: credit
    };
  }

  static ADD_REFERRAL = '[User] Add Referral';
  addReferral(referral: Referral): Action {
    return {
      type: UserActions.ADD_REFERRAL,
      payload: referral
    };
  }

  static ADMIN_LOGIN = '[User] Admin Login';
  adminLogin(user: User): Action {
    return {
      type: UserActions.ADMIN_LOGIN,
      payload: user
    };
  }

  static ADMIN_LOGIN_FAIL = '[User] Admin Login Fail';
  adminLoginFail(user: User): Action {
    return {
      type: UserActions.ADMIN_LOGIN_FAIL,
      payload: user
    };
  }

  static ADMIN_LOGIN_SUCCESS = '[User] Admin Login Success';
  adminLoginSuccess(user: User): Action {
    return {
      type: UserActions.ADMIN_LOGIN_SUCCESS,
      payload: user
    };
  }

  static CHANGE_SELECTED_PRIZE = '[User] Change Selected Prize';
  changeSelectedPrize(id: string): Action {
    return {
      type: UserActions.CHANGE_SELECTED_PRIZE,
      payload: id
    };
  }

  static CHANGE_SELECTED_PRIZE_FAIL = '[User] Change Selected Prize Fail';
  changeSelectedPrizeFail(email: string): Action {
    return {
      type: UserActions.CHANGE_SELECTED_PRIZE_FAIL,
      payload: email
    };
  }


  static CHANGE_SELECTED_PRIZE_SUCCESS = '[User] Change Selected Prize Success';
  changeSelectedPrizeSuccess(res: Response): Action {
    return {
      type: UserActions.CHANGE_SELECTED_PRIZE_SUCCESS,
      payload: res
    };
  }

  static CHECK_EMAIL = '[User] Check Email';
  checkEmail(email: string): Action {
    return {
      type: UserActions.CHECK_EMAIL,
      payload: email
    };
  }

  static CHECK_EMAIL_FAIL = '[User] Check Email Fail';
  checkEmailFail(email: string): Action {
    return {
      type: UserActions.CHECK_EMAIL_FAIL,
      payload: email
    };
  }


  static CHECK_EMAIL_SUCCESS = '[User] Check Email Success';
  checkEmailSuccess(res: Response): Action {
    return {
      type: UserActions.CHECK_EMAIL_SUCCESS,
      payload: res
    };
  }

  static CHECK_IF_USER_UPDATED = '[User] Check If User Updated';
  checkIfUserUpdated(): Action {
    return {
      type: UserActions.CHECK_IF_USER_UPDATED
    };
  }

  static CHECK_IF_USER_UPDATED_FAIL = '[User] Check If User Updated Fail';
  checkIfUserUpdatedFail(res: any): Action {
    return {
      type: UserActions.CHECK_IF_USER_UPDATED_FAIL,
      payload: res
    };
  }

  static CHECK_IF_USER_UPDATED_SUCCESS = '[User] Check If User Updated Success';
  checkIfUserUpdatedSuccess(res: any): Action {
    return {
      type: UserActions.CHECK_IF_USER_UPDATED_SUCCESS,
      payload: res
    };
  }

  static CHECK_IP_MATCH = '[User] Check IP Match';
  checkIPMatch(): Action {
    return {
      type: UserActions.CHECK_IP_MATCH
    };
  }

  static CHECK_IP_MATCH_FAIL = '[User] Check IP Match Fail';
  checkIPMatchFail(err: Error): Action {
    return {
      type: UserActions.CHECK_IP_MATCH_FAIL,
      payload: err
    };
  }


  static CHECK_IP_MATCH_SUCCESS = '[User] Check IP Match Success';
  checkIPMatchSuccess(res): Action {
    return {
      type: UserActions.CHECK_IP_MATCH_SUCCESS,
      payload: res
    };
  }

  static CHECK_LOGGED_IN = '[User] Check Logged In';
  checkLoggedIn(): Action {
    return {
      type: UserActions.CHECK_LOGGED_IN
    };
  }

  static CHECK_LOGGED_IN_FAIL = '[User] Check Logged In Fail';
  checkLoggedInFail(res: any): Action {
    return {
      type: UserActions.CHECK_LOGGED_IN_FAIL,
      payload: res
    };
  }

  static CHECK_LOGGED_IN_SUCCESS = '[User] Check Logged In Success';
  checkLoggedInSuccess(res: any): Action {
    return {
      type: UserActions.CHECK_LOGGED_IN_SUCCESS,
      payload: res
    };
  }


  static DESELECT_ALL_REFERRALS = '[User] Deselect All Referrals';
  deSelectAllReferrals(): Action {
    return {
      type: UserActions.DESELECT_ALL_REFERRALS
    };
  }

  static DESELECT_REFERRALS = '[User] Deselect Referrals';
  deSelectReferrals(ids: string[]): Action {
    return {
      type: UserActions.DESELECT_REFERRALS,
      payload: ids
    };
  }

  static DISMISS_PROFILE_CHANGES = '[User] Dismiss Profile Changes';
  dismissProfileChanges(): Action {
    return {
      type: UserActions.DISMISS_PROFILE_CHANGES
    };
  }

  static DISMISS_PROFILE_CHANGES_FAIL = '[User] Dismiss Profile Changes Fail';
  dismissProfileChangesFail(err: Error): Action {
    return {
      type: UserActions.DISMISS_PROFILE_CHANGES_FAIL,
      payload: err
    };
  }


  static DISMISS_PROFILE_CHANGES_SUCCESS = '[User] Dismiss Profile Changes Success';
  dismissProfileChangesSuccess(res: Response): Action {
    return {
      type: UserActions.DISMISS_PROFILE_CHANGES_SUCCESS,
      payload: res
    };
  }

  static FORGOT_PASSWORD = '[User] Forgot Password';
  forgotPassword(email: string): Action {
    return {
      type: UserActions.FORGOT_PASSWORD,
      payload: email
    };
  }

  static FORGOT_PASSWORD_SUCCESS = '[User] Forgot Password Success';
  forgotPasswordSuccess(res: any): Action {
    return {
      type: UserActions.FORGOT_PASSWORD_SUCCESS,
      payload: res
    };
  }

  static FORGOT_PASSWORD_FAIL = '[User] Forgot Password Fail';
  forgotPasswordFail(err: Error): Action {
    return {
      type: UserActions.FORGOT_PASSWORD_FAIL,
      payload: err
    };
  }

  static GET_PROFILE = '[User] Get Profile';
  getProfile(): Action {
    return {
      type: UserActions.GET_PROFILE
    };
  }

  static GET_PROFILE_FAIL = '[User] Get Profile Fail';
  getProfileFail(user: Response): Action {
    return {
      type: UserActions.GET_PROFILE_FAIL,
      payload: user
    };
  }
  static GET_PROFILE_SUCCESS = '[User] Get Profile Success';
  getProfileSuccess(user: Response): Action {
    return {
      type: UserActions.GET_PROFILE_SUCCESS,
      payload: user
    };
  }

  static GET_REFERRAL = '[User] Get Referral';
  getReferral(id: string): Action {
    return {
      type: UserActions.GET_REFERRAL,
      payload: id
    };
  }

  static GET_REFERRAL_FAIL = '[User] Get Referral Fail';
  getReferralFail(user: Response): Action {
    return {
      type: UserActions.GET_REFERRAL_FAIL,
      payload: user
    };
  }
  static GET_REFERRAL_SUCCESS = '[User] Get Referral Success';
  getReferralSuccess(user: Response): Action {
    return {
      type: UserActions.GET_REFERRAL_SUCCESS,
      payload: user
    };
  }

  static HIDE_REFERRALS = '[User] Hide Referrals';
  hideReferrals(hideRefs: { ids: string[], hide: boolean }): Action {
    return {
      type: UserActions.HIDE_REFERRALS,
      payload: hideRefs
    };
  }

  static HIDE_REFERRALS_FAIL = '[User] Hide Referrals Fail';
  hideReferralsFail(err: Error): Action {
    return {
      type: UserActions.HIDE_REFERRALS_FAIL,
      payload: err
    };
  }

  static HIDE_REFERRALS_SUCCESS = '[User] Hide Referrals Success';
  hideReferralsSuccess(res: { ids: string[], hide: boolean }): Action {
    return {
      type: UserActions.HIDE_REFERRALS_SUCCESS,
      payload: res
    };
  }

  static LOGIN = '[User] Login';
  login(user: User): Action {
    return {
      type: UserActions.LOGIN,
      payload: user
    };
  }

  static LOGIN_FAIL = '[User] Login Fail';
  loginFail(user: User): Action {
    return {
      type: UserActions.LOGIN_FAIL,
      payload: user
    };
  }

  static LOGIN_SUCCESS = '[User] Login Success';
  loginSuccess(user: User): Action {
    return {
      type: UserActions.LOGIN_SUCCESS,
      payload: user
    };
  }

  static LOG_MESSAGE = '[User] Log Message';
  logMessage(message: string): Action {
    return {
      type: UserActions.LOG_MESSAGE,
      payload: message
    };
  }

  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

  static LOGOUT_FAIL = '[User] Logout Fail';
  logoutFail(res: any): Action {
    return {
      type: UserActions.LOGOUT_FAIL,
      payload: res
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success';
  logoutSuccess(): Action {
    return {
      type: UserActions.LOGOUT_SUCCESS
    };
  }

  static RECORD_CLICK = '[User] Record Click';
  recordClick(offerId: string): Action {
    return {
      type: UserActions.RECORD_CLICK,
      payload: offerId
    };
  }

  static RECORD_CLICK_FAIL = '[User] Record Click Fail';
  recordClickFail(res: Response): Action {
    return {
      type: UserActions.RECORD_CLICK_FAIL
    };
  }

  static RECORD_CLICK_SUCCESS = '[User] Record Click Success';
  recordClickSuccess(redirect: string): Action {
    return {
      type: UserActions.RECORD_CLICK_SUCCESS,
      payload: redirect
    };
  }

  static REGISTER = '[User] Register';
  register(user: User): Action {
    return {
      type: UserActions.REGISTER,
      payload: user
    };
  }

  static REGISTER_FAIL = '[User] Register Fail';
  registerFail(user: User): Action {
    return {
      type: UserActions.REGISTER_FAIL,
      payload: user
    };
  }

  static REGISTER_SUCCESS = '[User] Register Success';
  registerSuccess(user: User): Action {
    return {
      type: UserActions.REGISTER_SUCCESS,
      payload: user
    };
  }

  static REMOVE_REFERRALS = '[User] Remove Referrals';
  removeReferrals(ids: string[]): Action {
    return {
      type: UserActions.REMOVE_REFERRALS,
      payload: ids
    };
  }

  static REMOVE_REFERRALS_FAIL = '[User] Remove Referrals Fail';
  removeReferralsFail(err: Error): Action {
    return {
      type: UserActions.REMOVE_REFERRALS_FAIL,
      payload: err
    };
  }

  static REMOVE_REFERRALS_SUCCESS = '[User] Remove Referrals Success';
  removeReferralsSuccess(res: { ids: string[] }): Action {
    return {
      type: UserActions.REMOVE_REFERRALS_SUCCESS,
      payload: res
    };
  }

  static RESET_PASSWORD = '[User] Reset Password';
  resetPassword(reset: { email: string, code: string, password: string }): Action {
    return {
      type: UserActions.RESET_PASSWORD,
      payload: reset
    };
  }

  static RESET_PASSWORD_SUCCESS = '[User] Reset Password Success';
  resetPasswordSuccess(res: any): Action {
    return {
      type: UserActions.RESET_PASSWORD_SUCCESS,
      payload: res
    };
  }

  static RESET_PASSWORD_FAIL = '[User] Reset Password Fail';
  resetPasswordFail(err: Error): Action {
    return {
      type: UserActions.RESET_PASSWORD_FAIL,
      payload: err
    };
  }

  static SELECT_REFERRALS = '[User] Select Referrals';
  selectReferrals(ids: string[]): Action {
    return {
      type: UserActions.SELECT_REFERRALS,
      payload: ids
    };
  }

  static SET_ADMIN_LOGIN_PAGE = '[User] Set Admin Login Page';
  setAdminLoginPage(onAdminLogin: boolean): Action {
    return {
      type: UserActions.SET_ADMIN_LOGIN_PAGE,
      payload: onAdminLogin
    };
  }

  static SET_CREDIT_TOTAL = '[User] Set Credit Total';
  setCreditTotal(total: number): Action {
    return {
      type: UserActions.SET_CREDIT_TOTAL,
      payload: total
    };
  }

  static SET_ORDER_PENDING = '[User] Set Order Pending';
  setOrderPending(pending: boolean): Action {
    return {
      type: UserActions.SET_ORDER_PENDING,
      payload: pending
    };
  }

  static SET_REFERRED_BY = '[User] Set Referred By';
  setReferredBy(username: string): Action {
    return {
      type: UserActions.SET_REFERRED_BY,
      payload: username
    };
  }

  static SET_SPONSOR = '[User] Set Sponsor';
  setSponsor(sponsorUsername: string): Action {
    return {
      type: UserActions.SET_SPONSOR,
      payload: sponsorUsername
    };
  }

  static SET_SPONSOR_SUCCESS = '[User] Set Sponsor Success';
  setSponsorSuccess(res: any): Action {
    return {
      type: UserActions.SET_SPONSOR_SUCCESS,
      payload: res
    };
  }

  static SET_SPONSOR_FAIL = '[User] Set Sponsor Fail';
  setSponsorFail(err: Error): Action {
    return {
      type: UserActions.SET_SPONSOR_FAIL,
      payload: err
    };
  }

  static SORT_REFERRALS_BY = '[User] Sort Referrals By';
  sortReferralsBy(sort: { sortBy: string, reverse: boolean }): Action {
    return {
      type: UserActions.SORT_REFERRALS_BY,
      payload: sort
    };
  }

  static UPDATE_CURRENT_LEVEL = '[User] Update Current Level';
  updateCurrentLevel(current: { currentLevel: number, leveledUp: boolean }): Action {
    return {
      type: UserActions.UPDATE_CURRENT_LEVEL,
      payload: current
    };
  }

  static UPDATE_ORDER_PENDING = '[User] Update Order Pending';
  updateOrderPending(pending: boolean): Action {
    return {
      type: UserActions.UPDATE_ORDER_PENDING,
      payload: pending
    };
  }

  static UPDATE_PROFILE = '[User] Update Profile';
  updateProfile(user: User): Action {
    return {
      type: UserActions.UPDATE_PROFILE,
      payload: user
    };
  }

  static UPDATE_PROFILE_SUCCESS = '[User] Update Profile Success';
  updateProfileSuccess(res: any): Action {
    return {
      type: UserActions.UPDATE_PROFILE_SUCCESS,
      payload: res
    };
  }

  static UPDATE_PROFILE_FAIL = '[User] Update Profile Fail';
  updateProfileFail(user: User): Action {
    return {
      type: UserActions.UPDATE_PROFILE_FAIL,
      payload: user
    };
  }

  static UPDATE_HAS_QUALIFIED_REFERRALS = '[User] Update Has Qualified Referrals';
  updateHasQualifiedReferrals(user: {
    hasQualifiedReferrals: boolean,
    hasReferralsBeyondLevel: boolean
  }): Action {
    return {
      type: UserActions.UPDATE_HAS_QUALIFIED_REFERRALS,
      payload: user
    };
  }

  static UPDATE_REFERRAL = '[User] Update Referral';
  updateReferral(referral: Referral): Action {
    return {
      type: UserActions.UPDATE_HAS_QUALIFIED_REFERRALS,
      payload: referral
    };
  }

}
