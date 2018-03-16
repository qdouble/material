/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter,  EntityState } from '@ngrx/entity';

import {
  CreditRequestActions,
  CreditRequestActionTypes
} from '../features/support/credit-request.actions';
import { OfferClick } from '../features/support/credit-request.model';

export const adapter = createEntityAdapter<OfferClick>();

export interface State extends EntityState<OfferClick> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState,
  action: CreditRequestActions): State {
  switch (action.type) {

    case CreditRequestActionTypes.GetOfferClicks:
      return { ...state, loading: true, loaded: false };
    case CreditRequestActionTypes.GetOfferClicksFail:
      return { ...state, loading: false, loaded: false };

    case CreditRequestActionTypes.GetOfferClicksSuccess: {
      const offerClicks = action.payload.offerClicks;
      if (!Array.isArray(offerClicks)) return { ...state, loading: false, loaded: false };
      return {
        ...adapter.addAll(offerClicks, state),
        loading: false,
        loaded: true
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
