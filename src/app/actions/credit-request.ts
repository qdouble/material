/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { CreditRequest } from '../models/credit-request';

@Injectable()

export class CreditRequestActions {

  static ADD_CREDIT_REQUEST = '[CreditRequest] Add Credit Request';
  addCreditRequest(creditRequest: CreditRequest): Action {
    return {
      type: CreditRequestActions.ADD_CREDIT_REQUEST,
      payload: creditRequest
    };
  }

  static ADD_CREDIT_REQUEST_FAIL = '[CreditRequest] Add Credit Request Fail';
  addCreditRequestFail(err: Error): Action {
    return {
      type: CreditRequestActions.ADD_CREDIT_REQUEST_FAIL,
      payload: err
    };
  }

  static ADD_CREDIT_REQUEST_SUCCESS = '[CreditRequest] Add Credit Request Success';
  addCreditRequestSuccess(creditRequest: CreditRequest): Action {
    return {
      type: CreditRequestActions.ADD_CREDIT_REQUEST_SUCCESS,
      payload: creditRequest
    };
  }


  static EDIT_CREDIT_REQUEST = '[CreditRequest] Edit Credit Request';
  editCreditRequest(creditRequest: CreditRequest): Action {
    return {
      type: CreditRequestActions.EDIT_CREDIT_REQUEST,
      payload: creditRequest
    };
  }

  static EDIT_CREDIT_REQUEST_FAIL = '[CreditRequest] Edit Credit Request Fail';
  editCreditRequestFail(err: Error): Action {
    return {
      type: CreditRequestActions.EDIT_CREDIT_REQUEST_FAIL,
      payload: err
    };
  }

  static EDIT_CREDIT_REQUEST_SUCCESS = '[CreditRequest] Edit Credit Request Success';
  editCreditRequestSuccess(creditRequest: CreditRequest): Action {
    return {
      type: CreditRequestActions.EDIT_CREDIT_REQUEST_SUCCESS,
      payload: creditRequest
    };
  }

  static GET_CREDIT_REQUEST = '[CreditRequest] Get Credit Request';
  getCreditRequest(id: string): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUEST,
      payload: id
    };
  }

  static GET_CREDIT_REQUEST_FAIL = '[CreditRequest] Get Credit Request Fail';
  getCreditRequestFail(err: Error): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUEST_FAIL,
      payload: err
    };
  }

  static GET_CREDIT_REQUEST_SUCCESS = '[CreditRequest] Get Credit Request Success';
  getCreditRequestSuccess(creditRequest: CreditRequest): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUEST_SUCCESS,
      payload: creditRequest
    };
  }

  static GET_CREDIT_REQUESTS = '[CreditRequest] Get Credit Requests';
  getCreditRequests(): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUESTS
    };
  }

  static GET_CREDIT_REQUESTS_FAIL = '[CreditRequest] Get Credit Requests Fail';
  getCreditRequestsFail(err: Error): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUESTS_FAIL,
      payload: err
    };
  }

  static GET_CREDIT_REQUESTS_SUCCESS = '[CreditRequest] Get Credit Requests Success';
  getCreditRequestsSuccess(creditRequests: CreditRequest[]): Action {
    return {
      type: CreditRequestActions.GET_CREDIT_REQUESTS_SUCCESS,
      payload: creditRequests
    };
  }

  static GET_OFFER_CLICKS = '[CreditRequest] Get Offer Clicks';
  getOfferClicks(): Action {
    return {
      type: CreditRequestActions.GET_OFFER_CLICKS
    };
  }

  static GET_OFFER_CLICKS_FAIL = '[CreditRequest] Get Offer Clicks Fail';
  getOfferClicksFail(err: Error): Action {
    return {
      type: CreditRequestActions.GET_OFFER_CLICKS_FAIL,
      payload: err
    };
  }

  static GET_OFFER_CLICKS_SUCCESS = '[CreditRequest] Get Offer Clicks Success';
  getOfferClicksSuccess(creditRequests: CreditRequest[]): Action {
    return {
      type: CreditRequestActions.GET_OFFER_CLICKS_SUCCESS,
      payload: creditRequests
    };
  }

}
