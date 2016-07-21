/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Offer } from '../models';

@Injectable()

export class OfferActions {
  static GET_OFFERS = '[Offer] Get Offers';
  getOffers(): Action {
    return {
      type: OfferActions.GET_OFFERS
    };
  }

  static GET_OFFERS_FAIL = '[Offer] Get Offers Fail';
  getOffersFail(res: Response): Action {
    return {
      type: OfferActions.GET_OFFERS_FAIL
    };
  }

  static GET_OFFERS_SUCCESS = '[Offer] Get Offers Success';
  getOffersSuccess(offers: Offer): Action {
    return {
      type: OfferActions.GET_OFFERS_SUCCESS,
      payload: offers
    };
  }

  static SELECT_OFFER = '[Offer] Select Offer';
  selectOffer(offer: Offer): Action {
    return {
      type: OfferActions.SELECT_OFFER,
      payload: offer
    };
  }
}
