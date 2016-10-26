/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import { OfferActions } from '../actions';
import { Offer } from '../models';

export interface OfferState {
  ids: string[];
  entities: { [id: string]: Offer };
  loading: boolean;
  loaded: boolean;
  selectedOffer: string | null;
};

const initialState: OfferState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  selectedOffer: null
};

export function offerReducer (state = initialState, action: Action): OfferState {
  switch (action.type) {

    case OfferActions.GET_OFFERS:
      return Object.assign({}, state, { loading: true });

    case OfferActions.GET_OFFERS_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case OfferActions.GET_OFFERS_SUCCESS: {
      const offers: Offer[] = action.payload.offers;
      if (!offers) return Object.assign({}, state, { loading: false });
      const newOffers: Offer[] = offers.filter(offer => !state.entities[offer.id!]);
      const newOfferIds: string[] = newOffers.map(offer => offer.id!);
      const newOfferEntities = newOffers.reduce(
        (entities: { [id: string]: Offer }, offer: Offer) => {
          if (offer.id)
          return Object.assign(entities, {
            [offer.id]: offer
          });
        }, {});

      return {
        ids: [...state.ids, ...newOfferIds],
        entities: Object.assign({}, state.entities, newOfferEntities),
        loading: false,
        loaded: true,
        selectedOffer: state.selectedOffer
      };

    }

    case OfferActions.SELECT_OFFER:
      return Object.assign({}, state, { selectedOffer: action.payload });

    default: {
      return state;
    }
  }
}

function _getLoaded() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loading);
}

function _getOfferEntities() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.entities);
}

function _getOffers(offerIds: string[]) {
  return (state$: Observable<OfferState>) => state$
    .let(_getOfferEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

function _getOfferIds() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.ids);
}

function _getSelectedOffer() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.selectedOffer);
}

function _getOfferState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.offer);
}

export function getOffers(offerIds: string[]) {
  return compose(_getOffers(offerIds), _getOfferState());
}

export function getOfferIds() {
  return compose(_getOfferIds(), _getOfferState());
}

export function getOfferEntities() {
  return compose(_getOfferEntities(), _getOfferState());
}

export function getOfferLoaded() {
  return compose(_getLoaded(), _getOfferState());
}

export function getOfferLoading() {
  return compose(_getLoading(), _getOfferState());
}

export function getOfferSelected() {
  return compose(_getSelectedOffer(), _getOfferState());
}

export function getOfferCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getOfferIds())
    .switchMap(offerId => state$.let(getOffers(offerId)));
}
