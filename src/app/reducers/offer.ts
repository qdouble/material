/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { OfferActionTypes, OfferActions } from '../actions/offer';
import { Offer } from '../models/offer';
import { UserAgent } from '../models/user-agent';

export const adapter = createEntityAdapter<Offer>({
  selectId: (offer: Offer) => offer.id
});

export interface State extends EntityState<Offer> {
  ids: string[];
  lastUpdatedAt: string;
  loading: boolean;
  loaded: boolean;
  loadedUserOffers: boolean;
  rankUpdatedAt: string;
  selectedOffer: string | null;
  userAgent: UserAgent;
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  lastUpdatedAt: null,
  loading: false,
  loaded: false,
  loadedUserOffers: false,
  rankUpdatedAt: null,
  selectedOffer: null,
  userAgent: null
});

export function offerReducer(state = initialState, action: OfferActions): State {
  switch (action.type) {

    case OfferActionTypes.ClearOffers:
      return {
        ...adapter.removeAll(state),
        loaded: false,
        loadedUserOffers: false
      };

    case OfferActionTypes.GetOffer:
      return { ...state, selectedOffer: action.payload };
    case OfferActionTypes.GetOffers:
      return { ...state, loading: true };

    case OfferActionTypes.GetOfferFail:
    case OfferActionTypes.GetOffersFail: {
      return { ...state, loading: false };
    }

    case OfferActionTypes.GetOfferSuccess: {
      const offer = action.payload.offer;
      const userAgent = action.payload.userAgent;
      if (!offer) return { ...state, loading: false };
      return {
        ...adapter.upsertOne({
          id: offer.id, changes: {
            ...offer,
            costToUser: offer.costToUser === -1 ? 1000 : offer.costToUser,
            popularityRank: offer.popularityRank ? offer.popularityRank : 99,
            popularityRank2: offer.popularityRank2 ? offer.popularityRank2 : 999,
            featured: offer.popularityRank ||
              (offer.popularityRank2 && offer.popularityRank2 <= 20) ? true : false
          }
        }, state),
        userAgent: userAgent,
        loading: false
      };
    }

    case OfferActionTypes.GetOffersSuccess: {
      const offers = action.payload.offers;
      const loadedUserOffers = action.payload.loadedUserOffers;
      const rankUpdatedAt = action.payload.rankUpdatedAt;
      if (!offers) return { ...state, loading: false };

      const newOffers = offers;
      const offerIds = newOffers.map(offer => offer.id!);
      const offerEntities = newOffers.reduce(
        (entities: { [id: string]: Offer }, offer: Offer) => {
          if (offer.id)
            return Object.assign(entities, {
              [offer.id]: {
                ...offer,
                costToUser: offer.costToUser === -1 ? 1000 : offer.costToUser,
                popularityRank: offer.popularityRank ? offer.popularityRank : 99,
                popularityRank2: offer.popularityRank2 ? offer.popularityRank2 : 999,
                featured: offer.popularityRank ||
                  (offer.popularityRank2 && offer.popularityRank2 <= 20) ? true : false
              }
            });
        }, {});

      return {
        ...state,
        ids: [...offerIds],
        entities: offerEntities,
        loading: false,
        loaded: true,
        loadedUserOffers: loadedUserOffers || false,
        rankUpdatedAt: rankUpdatedAt
      };
    }

    case OfferActionTypes.GetOffersUpdatedAtSuccess: {
      const lastUpdatedAt = action.payload.lastUpdatedAt;
      if (!lastUpdatedAt || lastUpdatedAt === state.lastUpdatedAt) return state;
      return {
        ...state,
        lastUpdatedAt: lastUpdatedAt
      };
    }

    default: {
      return state;
    }
  }
}

export const getLastUpdatedAt = (state: State) => state.lastUpdatedAt;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getLoadedUserOffers = (state: State) => state.loadedUserOffers;

export const getRankUpdatedAt = (state: State) => state.rankUpdatedAt;

export const getUserAgent = (state: State) => state.userAgent;

export const getSelectedOffer = (state: State) => state.selectedOffer;
