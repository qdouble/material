/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import {
  CreditRequestActions,
  CreditRequestActionTypes
} from '../features/support/credit-request.actions';
import { CreditRequest } from '../features/support/credit-request.model';

export const adapter = createEntityAdapter<CreditRequest>({
  selectId: (creditRequest: CreditRequest) => creditRequest.id
});

export interface State extends EntityState<CreditRequest> {
  added: boolean;
  adding: boolean;
  ids: string[];
  loading: boolean;
  loaded: boolean;
  loadingClicks: boolean;
  loadedClicks: boolean;
  selectedCreditRequest: string | null;
}

export const initialState: State = adapter.getInitialState({
  added: false,
  adding: false,
  ids: [],
  loading: false,
  loaded: false,
  loadingClicks: false,
  loadedClicks: false,
  selectedCreditRequest: null
});

export function creditRequestReducer(state = initialState,
  action: CreditRequestActions): State {
  switch (action.type) {

    case CreditRequestActionTypes.AddCreditRequest:
      return { ...state, adding: true, added: false };

    case CreditRequestActionTypes.AddCreditRequestFail:
      return { ...state, adding: false, added: false };

    case CreditRequestActionTypes.AddCreditRequestSuccess: {
      if (!action.payload.creditRequest || !action.payload.id)
        return { ...state, adding: false, added: false };
      const id = action.payload.id;
      const creditRequest = { ...action.payload.creditRequest, id: id };
      creditRequest.id = id;
      return {
        ...adapter.addOne(creditRequest, state),
        added: true,
        adding: false
      };
    }

    case CreditRequestActionTypes.EditCreditRequest:
      return { ...state, adding: true, added: false };
    case CreditRequestActionTypes.EditCreditRequestFail:
      return { ...state, adding: true, added: false };

    case CreditRequestActionTypes.EditCreditRequestSuccess: {
      let creditRequest = action.payload.creditRequest;
      if (!action.payload.creditRequest)
        return { ...state, adding: false, added: false };

      return {
        ...adapter.updateOne({ id: creditRequest.id, changes: creditRequest }, state),
        added: true,
        adding: false
      };
    }


    case CreditRequestActionTypes.GetCreditRequest:
      return {
        ...state,
        loading: true,
        loaded: false,
        selectedCreditRequest: action.payload
      };

    case CreditRequestActionTypes.GetCreditRequestFail:
      return { ...state, loading: false };

    case CreditRequestActionTypes.GetCreditRequestSuccess: {
      const creditRequest = action.payload.creditRequest;
      if (!creditRequest || !creditRequest.id)
        return { ...state, loading: false };

      let stateIds = state.ids;
      if (stateIds.includes(creditRequest.id)) {
        return {
          ...state,
          entities: { ...state.entities, [creditRequest.id]: creditRequest },
          loading: false,
          loaded: true
        };
      }

      return {
        ...adapter.addOne(creditRequest, state),
        loading: false,
        loaded: true
      };
    }

    case CreditRequestActionTypes.GetCreditRequests:
      return { ...state, loading: true };
    case CreditRequestActionTypes.GetCreditRequestsFail:
      return { ...state, loading: true };

    case CreditRequestActionTypes.GetCreditRequestsSuccess: {
      const creditRequests = action.payload.creditRequests;
      if (!Array.isArray(creditRequests)) return { ...state, loading: true };

      return {
        ...adapter.addAll(creditRequests, state),
        loading: false,
        loaded: true
      };
    }

    case CreditRequestActionTypes.UpdateCreditRequest: {
      const creditRequest: CreditRequest = action.payload.creditRequest;
      if (!creditRequest) return state;
      return {
        ...adapter.updateOne({
          id: creditRequest.id,
          changes: { status: creditRequest.status, userNotes: creditRequest.userNotes }
        }, state)
      };
    }

    default: {
      return state;
    }
  }
}

export const getAdded = (state: State) => state.added;

export const getAdding = (state: State) => state.adding;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getLoadedClicks = (state: State) => state.loadedClicks;

export const getLoadingClicks = (state: State) => state.loadingClicks;

export const getSelectedCreditRequest = (state: State) => state.selectedCreditRequest;
