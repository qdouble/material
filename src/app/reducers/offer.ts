/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import { OfferActions } from '../actions/offer';
import { Offer } from '../models/offer';
import { UserAgent } from '../models/user-agent';

export interface OfferState {
  ids: string[];
  entities: { [id: string]: Offer };
  lastUpdatedAt: string;
  loading: boolean;
  loaded: boolean;
  loadedUserOffers: boolean;
  rankUpdatedAt: string;
  selectedOffer: string | null;
  userAgent: UserAgent;
}

export const initialState: OfferState = {
  ids: [],
  entities: {},
  lastUpdatedAt: null,
  loading: false,
  loaded: false,
  loadedUserOffers: false,
  rankUpdatedAt: null,
  selectedOffer: null,
  userAgent: null
};

export function offerReducer(state = initialState, action: Action): OfferState {
  switch (action.type) {

    case OfferActions.CLEAR_OFFERS:
      return Object.assign({}, state, {
        ids: [],
        entities: {},
        loaded: false,
        loadedUserOffers: false
      });

    case OfferActions.GET_OFFER:
    case OfferActions.GET_OFFERS:
      return Object.assign({}, state, { loading: true });

    case OfferActions.GET_OFFER_FAIL:
    case OfferActions.GET_OFFERS_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case OfferActions.GET_OFFER_SUCCESS: {
      const offer: Offer = action.payload.offer;
      const userAgent = action.payload.userAgent;
      if (!offer) return Object.assign({}, state, { loading: false });
      const newOfferIds = [...state.ids];
      if (!state.ids.includes(offer.id)) {
        newOfferIds.push(offer.id);
      }
      return Object.assign({}, state, {
        ids: newOfferIds,
        entities: Object.assign({}, state.entities, {
          [offer.id]: Object.assign({}, offer, {
            costToUser: offer.costToUser === -1 ? 1000 : offer.costToUser,
            popularityRank: offer.popularityRank ? offer.popularityRank : 99,
            popularityRank2: offer.popularityRank2 ? offer.popularityRank2 : 999,
            featured: offer.popularityRank ||
            (offer.popularityRank2 && offer.popularityRank2 <= 20) ? true : false
          })
        }),
        userAgent: userAgent,
        loading: false
      });
    }

    case OfferActions.GET_OFFERS_SUCCESS: {
      const offers: Offer[] = action.payload.offers;
      const rankUpdatedAt = action.payload.rankUpdatedAt;
      if (!offers) return Object.assign({}, state, { loading: false });
      // if (state.loaded) {
      //   const newOffers: Offer[] = offers.filter(offer => !state.entities[offer.id!]);
      //   const newOfferIds: string[] = newOffers.map(offer => offer.id!);
      //   const newOfferEntities = newOffers.reduce(
      //     (entities: { [id: string]: Offer }, offer: Offer) => {
      //       if (offer.id)
      //         return Object.assign(entities, {
      //           [offer.id]: Object.assign({}, offer, {
      //             costToUser: offer.costToUser === -1 ? 1000 : offer.costToUser
      //           })
      //         });
      //     }, {});

      //   return Object.assign({}, state, {
      //     ids: [...state.ids, ...newOfferIds],
      //     entities: Object.assign({}, state.entities, newOfferEntities),
      //     loading: false,
      //     loadedUserOffers: action.payload.loadedUserOffers || false,
      //     loaded: true
      //   });
      // }

      const newOffers: Offer[] = offers;
      const offerIds: string[] = newOffers.map(offer => offer.id!);
      const offerEntities = newOffers.reduce(
        (entities: { [id: string]: Offer }, offer: Offer) => {
          if (offer.id)
            return Object.assign(entities, {
              [offer.id]: Object.assign({}, offer, {
                costToUser: offer.costToUser === -1 ? 1000 : offer.costToUser,
                popularityRank: offer.popularityRank ? offer.popularityRank : 99,
                popularityRank2: offer.popularityRank2 ? offer.popularityRank2 : 999,
                featured: offer.popularityRank ||
                (offer.popularityRank2 && offer.popularityRank2 <= 20) ? true : false
              })
            });
        }, {});

      return Object.assign({}, state, {
        ids: [...offerIds],
        entities: offerEntities,
        loading: false,
        loaded: true,
        loadedUserOffers: action.payload.loadedUserOffers || false,
        rankUpdatedAt: rankUpdatedAt
      });


    }

    case OfferActions.GET_OFFERS_UPDATED_AT_SUCCESS: {
      const lastUpdatedAt = action.payload.lastUpdatedAt;
      if (!lastUpdatedAt || lastUpdatedAt === state.lastUpdatedAt) return state;
      return {
        ...state,
        lastUpdatedAt: lastUpdatedAt
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

function _getLoadedUserOffers() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loadedUserOffers);
}

function _getLoading() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.loading);
}

function _getOfferEntities() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.entities);
}

function _getOffer(id: string) {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.entities[id]);
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

function _getOfferRankUpdatedAt() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.rankUpdatedAt);
}

function _getSelectedOffer() {
  return (state$: Observable<OfferState>) => state$
    .select(s => s.selectedOffer);
}

function _getOfferState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.offer);
}

export function getOffer(id: string) {
  return compose(_getOffer(id), _getOfferState());
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

export function getOfferLoadedUserOffers() {
  return compose(_getLoadedUserOffers(), _getOfferState());
}

export function getOfferLoading() {
  return compose(_getLoading(), _getOfferState());
}

export function getOfferRankUpdatedAt() {
  return compose(_getOfferRankUpdatedAt(), _getOfferState());
}

export function getOfferSelected() {
  return compose(_getSelectedOffer(), _getOfferState());
}

export function getOfferCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getOfferIds())
    .switchMap(offerId => state$.let(getOffers(offerId)));
}
