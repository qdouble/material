import { Action } from '@ngrx/store';

import { GetOffersResponse, GetOfferResponse } from '../models/offer';

export enum OfferActionTypes {
  ClearOffers = '[Offer] Clear Offers',
  GetOffer = '[Offer] Get Offer',
  GetOfferFail = '[Offer] Get Offer Fail',
  GetOfferSuccess = '[Offer] Get Offer Success',
  GetOffers = '[Offer] Get Offers',
  GetOffersFail = '[Offer] Get Offers Fail',
  GetOffersSuccess = '[Offer] Get Offers Success',
  GetOffersUpdatedAt = '[Offer] Get Offers Updated At',
  GetOffersUpdatedAtFail = '[Offer] Get Offers Updated At Fail',
  GetOffersUpdatedAtSuccess = '[Offer] Get Offers Updated At Success',
  GetViewOffers = '[Offer] Get View Offers'
}

export class ClearOffers implements Action {
  readonly type = OfferActionTypes.ClearOffers;
}

export class GetOffer implements Action {
  readonly type = OfferActionTypes.GetOffer;

  constructor(public payload: string) {}
}

export class GetOfferFail implements Action {
  readonly type = OfferActionTypes.GetOfferFail;

  constructor(public payload: Error) {}
}

export class GetOfferSuccess implements Action {
  readonly type = OfferActionTypes.GetOfferSuccess;

  constructor(public payload: GetOfferResponse) {}
}

export class GetOffers implements Action {
  readonly type = OfferActionTypes.GetOffers;
}

export class GetOffersFail implements Action {
  readonly type = OfferActionTypes.GetOffersFail;

  constructor(public payload: Error) {}
}

export class GetOffersSuccess implements Action {
  readonly type = OfferActionTypes.GetOffersSuccess;

  constructor(public payload: GetOffersResponse) {}
}

export class GetOffersUpdatedAt implements Action {
  readonly type = OfferActionTypes.GetOffersUpdatedAt;
}

export class GetOffersUpdatedAtFail implements Action {
  readonly type = OfferActionTypes.GetOffersUpdatedAtFail;

  constructor(public payload: Error) {}
}

export class GetOffersUpdatedAtSuccess implements Action {
  readonly type = OfferActionTypes.GetOffersUpdatedAtSuccess;

  constructor(public payload: { lastUpdatedAt: string }) {}
}

export class GetViewOffers implements Action {
  readonly type = OfferActionTypes.GetViewOffers;
}

export type OfferActions =
  | ClearOffers
  | GetOffer
  | GetOfferFail
  | GetOfferSuccess
  | GetOffers
  | GetOffersFail
  | GetOffersSuccess
  | GetOffersUpdatedAt
  | GetOffersUpdatedAtFail
  | GetOffersUpdatedAtSuccess
  | GetViewOffers;
