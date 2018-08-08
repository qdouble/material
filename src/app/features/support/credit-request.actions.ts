/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';

import {
  CreditRequest,
  GetCreditRequestsResponse,
  GetCreditRequestResponse
} from './credit-request.model';
import { GetOfferClicksResponse } from './offer-click.model';

export enum CreditRequestActionTypes {
  AddCreditRequest = '[CreditRequest] Add Credit Request',
  AddCreditRequestFail = '[CreditRequest] Add Credit Request Fail',
  AddCreditRequestSuccess = '[CreditRequest] Add Credit Request Success',
  EditCreditRequest = '[CreditRequest] Edit Credit Request',
  EditCreditRequestFail = '[CreditRequest] Edit Credit Request Fail',
  EditCreditRequestSuccess = '[CreditRequest] Edit Credit Request Success',
  GetCreditRequest = '[CreditRequest] Get Credit Request',
  GetCreditRequestFail = '[CreditRequest] Get Credit Request Fail',
  GetCreditRequestSuccess = '[CreditRequest] Get Credit Request Success',
  GetCreditRequests = '[CreditRequest] Get Credit Requests',
  GetCreditRequestsFail = '[CreditRequest] Get Credit Requests Fail',
  GetCreditRequestsSuccess = '[CreditRequest] Get Credit Requests Success',
  GetOfferClicks = '[CreditRequest] Get Offer Clicks',
  GetOfferClicksFail = '[CreditRequest] Offer Clicks Fail',
  GetOfferClicksSuccess = '[CreditRequest] Offer Clicks Success',
  UpdateCreditRequest = '[CreditRequest] Update Credit Request'
}

export class AddCreditRequest implements Action {
  readonly type = CreditRequestActionTypes.AddCreditRequest;

  constructor(public payload: CreditRequest) {}
}

export class AddCreditRequestFail implements Action {
  readonly type = CreditRequestActionTypes.AddCreditRequestFail;

  constructor(public payload: Error) {}
}

export class AddCreditRequestSuccess implements Action {
  readonly type = CreditRequestActionTypes.AddCreditRequestSuccess;

  constructor(public payload: GetCreditRequestResponse) {}
}

export class EditCreditRequest implements Action {
  readonly type = CreditRequestActionTypes.EditCreditRequest;

  constructor(public payload: CreditRequest) {}
}

export class EditCreditRequestFail implements Action {
  readonly type = CreditRequestActionTypes.EditCreditRequestFail;

  constructor(public payload: Error) {}
}

export class EditCreditRequestSuccess implements Action {
  readonly type = CreditRequestActionTypes.EditCreditRequestSuccess;

  constructor(public payload: GetCreditRequestResponse) {}
}

export class GetCreditRequest implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequest;

  constructor(public payload: string) {}
}

export class GetCreditRequestFail implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequestFail;

  constructor(public payload: Error) {}
}

export class GetCreditRequestSuccess implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequestSuccess;

  constructor(public payload: GetCreditRequestResponse) {}
}

export class GetCreditRequests implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequests;
}

export class GetCreditRequestsFail implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequestsFail;

  constructor(public payload: Error) {}
}

export class GetCreditRequestsSuccess implements Action {
  readonly type = CreditRequestActionTypes.GetCreditRequestsSuccess;

  constructor(public payload: GetCreditRequestsResponse) {}
}

export class GetOfferClicks implements Action {
  readonly type = CreditRequestActionTypes.GetOfferClicks;
}

export class GetOfferClicksFail implements Action {
  readonly type = CreditRequestActionTypes.GetOfferClicksFail;

  constructor(public payload: Error) {}
}

export class GetOfferClicksSuccess implements Action {
  readonly type = CreditRequestActionTypes.GetOfferClicksSuccess;

  constructor(public payload: GetOfferClicksResponse) {}
}

export class UpdateCreditRequest implements Action {
  readonly type = CreditRequestActionTypes.UpdateCreditRequest;

  constructor(public payload: { creditRequest: CreditRequest }) {}
}

export type CreditRequestActions =
  | AddCreditRequest
  | AddCreditRequestFail
  | AddCreditRequestSuccess
  | EditCreditRequest
  | EditCreditRequestFail
  | EditCreditRequestSuccess
  | GetCreditRequest
  | GetCreditRequestFail
  | GetCreditRequestSuccess
  | GetCreditRequests
  | GetCreditRequestsFail
  | GetCreditRequestsSuccess
  | GetOfferClicks
  | GetOfferClicksFail
  | GetOfferClicksSuccess
  | UpdateCreditRequest;
