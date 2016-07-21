/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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

export default function (state = initialState, action: Action): OfferState {
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

export function getLoaded() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loading);
}

export function getOfferEntities() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.entities);
}

export function getOffers(offerIds: string[]) {
  return (state$: Observable<OfferState>) => state$
    .let(getOfferEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

export function getOfferIds() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.ids);
}

export function getSelectedOffer() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.selectedOffer);
}


