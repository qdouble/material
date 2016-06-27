import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { User } from '../models/user';

@Injectable()

export class TestRequestActions {
  static CHECK_LOGIN_STATUS = '[Test Requests] Check Login Status'
  checkLoginStatus(): Action {
    return {
      type: TestRequestActions.CHECK_LOGIN_STATUS
    }
  }

  static CHECK_LOGIN_STATUS_FAIL = '[Test Requests] Check Login Status Fail'
  checkLoginStatusFail(res: any): Action {
    return {
      type: TestRequestActions.CHECK_LOGIN_STATUS_FAIL
    }
  }

  static CHECK_LOGIN_STATUS_SUCCESS = '[Test Requests] Check Login Status Success'
  checkLoginStatusSuccess(res: any): Action {
    return {
      type: TestRequestActions.CHECK_LOGIN_STATUS_SUCCESS
    }
  }

  static GET_AFFILIATES = '[Test Requests] Get Affiliates'
  getAffiliates(): Action {
    return {
      type: TestRequestActions.GET_AFFILIATES
    }
  }

  static GET_AFFILIATES_FAIL = '[Test Requests] Get Affiliates Fail'
  getAffiliatesFail(): Action {
    return {
      type: TestRequestActions.GET_AFFILIATES_FAIL
    }
  }

  static GET_AFFILIATES_SUCCESS = '[Test Requests] Get Affiliates Success'
  getAffiliatesSuccess(data: any): Action {
    return {
      type: TestRequestActions.GET_AFFILIATES_SUCCESS,
      payload: data
    }
  }

  static SHOW_ALL_USERS = '[Test Requests] Show All Users'
  showAllUsers(): Action {
    return {
      type: TestRequestActions.SHOW_ALL_USERS
    }
  }
  static SHOW_ALL_USERS_FAIL = '[Test Requests] Show All Users Fail'
  showAllUsersFail(response: Response): Action {
    return {
      type: TestRequestActions.SHOW_ALL_USERS_FAIL,
      payload: response
    }
  }
  static SHOW_ALL_USERS_SUCCESS = '[Test Requests] Show All Users Success'
  showAllUsersSuccess(response: Response): Action {
    return {
      type: TestRequestActions.SHOW_ALL_USERS_SUCCESS,
      payload: response
    }
  }

}