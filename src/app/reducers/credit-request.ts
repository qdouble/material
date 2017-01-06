/* tslint:disable: no-switch-case-fall-through */
/* tslint:disable: variable-names */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { CreditRequestActions } from '../features/support/credit-request.actions';
import { CreditRequest, OfferClick } from '../features/support/credit-request.model';

export interface CreditRequestState {
  ids: string[];
  entities: { [id: string]: CreditRequest };
  added: boolean;
  adding: boolean;
  loading: boolean;
  loaded: boolean;
  loadingClicks: boolean;
  loadedClicks: boolean;
  offerIds: string[];
  offerEntitites: { [id: string]: OfferClick };
};

export const initialState: CreditRequestState = {
  ids: [],
  entities: {},
  added: false,
  adding: false,
  loading: false,
  loaded: false,
  loadingClicks: false,
  loadedClicks: false,
  offerIds: [],
  offerEntitites: {}
};

export function creditRequestReducer(state = initialState, action: Action): CreditRequestState {
  switch (action.type) {

    case CreditRequestActions.ADD_CREDIT_REQUEST:
      return Object.assign({}, state, { adding: true, added: false });
    case CreditRequestActions.ADD_CREDIT_REQUEST_FAIL:
      return Object.assign({}, state, { adding: true, added: false });

    case CreditRequestActions.ADD_CREDIT_REQUEST_SUCCESS: {
      if (!action.payload.creditRequest || !action.payload.id)
        return Object.assign({}, state, { adding: false, added: false });
      const id: string = action.payload.id;
      const creditRequest = Object.assign({}, action.payload.creditRequest, {
        id: id
      });
      creditRequest.id = id;
      return Object.assign({}, state, {
        ids: [...state.ids, id],
        entities: Object.assign({}, state.entities, {
          [creditRequest.id]: creditRequest
        }),
        added: true,
        adding: false
      });
    }

    case CreditRequestActions.EDIT_CREDIT_REQUEST:
      return Object.assign({}, state, { adding: true, added: false });
    case CreditRequestActions.EDIT_CREDIT_REQUEST_FAIL:
      return Object.assign({}, state, { adding: true, added: false });

    case CreditRequestActions.EDIT_CREDIT_REQUEST_SUCCESS: {
      let creditRequest = action.payload.creditRequest;
      if (!action.payload.creditRequest)
        return Object.assign({}, state, { adding: false, added: false });
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [creditRequest.id]: creditRequest
        }),
        added: true,
        adding: false
      });
    }


    case CreditRequestActions.GET_CREDIT_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });

    case CreditRequestActions.GET_CREDIT_REQUEST_FAIL:
      return Object.assign({}, state, { loading: false });

    case CreditRequestActions.GET_CREDIT_REQUEST_SUCCESS: {
      const creditRequest: CreditRequest = action.payload.creditRequest;
      if (!creditRequest || !creditRequest.id)
        return Object.assign({}, state, { loading: false });

      if (state.ids.includes(creditRequest.id)) {
        return Object.assign({}, state, {
          entities: Object.assign({}, state.entities, {
            [creditRequest.id]: creditRequest
          }),
          loading: false,
          loaded: true
        });
      }

      return Object.assign({}, state, {
        ids: [...state.ids, creditRequest.id],
        entities: Object.assign({}, state.entities, {
          [creditRequest.id]: creditRequest
        }),
        loading: false,
        loaded: true
      });
    }

    case CreditRequestActions.GET_CREDIT_REQUESTS:
      return Object.assign({}, state, { loading: true });
    case CreditRequestActions.GET_CREDIT_REQUESTS_FAIL:
      return Object.assign({}, state, { loading: false });

    case CreditRequestActions.GET_CREDIT_REQUESTS_SUCCESS: {
      const creditRequests: CreditRequest[] = action.payload.creditRequests;
      if (!Array.isArray(creditRequests)) return Object.assign({}, state, { loading: false });
      const newCreditRequestIds: string[] = creditRequests.map(
        creditRequest => creditRequest.id || '');
      const newCreditRequestEntities = creditRequests.reduce(
        (entities: { [id: string]: CreditRequest }, creditRequest: CreditRequest) => {
          if (creditRequest.id)
            return Object.assign(entities, {
              [creditRequest.id]: creditRequest
            });
        }, {});

      return Object.assign({}, state, {
        ids: newCreditRequestIds,
        entities: Object.assign({}, state.entities, newCreditRequestEntities),
        loading: false,
        loaded: true
      });
    }

    case CreditRequestActions.GET_OFFER_CLICKS:
      return Object.assign({}, state, { loadingClicks: true });
    case CreditRequestActions.GET_OFFER_CLICKS_FAIL:
      return Object.assign({}, state, { loadingClicks: false });

    case CreditRequestActions.GET_OFFER_CLICKS_SUCCESS: {
      const offerClicks: OfferClick[] = action.payload.offerClicks;
      if (!Array.isArray(offerClicks)) return Object.assign({}, state, { loadingClicks: false });
      const offerClickIds: string[] = offerClicks.map(offerClick => offerClick.id || '');
      const offerClickEntities = offerClicks.reduce(
        (entities: { [id: string]: OfferClick }, offerClick: OfferClick) => {
          if (offerClick.id)
            return Object.assign(entities, {
              [offerClick.id]: offerClick
            });
        }, {});

      return Object.assign({}, state, {
        offerIds: offerClickIds,
        offerEntitites: offerClickEntities,
        loadingClicks: false,
        loadedClicks: true
      });
    }


    default: {
      return state;
    }
  }
}


function _getCreditRequestEntities() {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.entities);
}

function _getCreditRequest(id: string) {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.entities[id]);
}

function _getCreditRequests(creditRequestIds: string[]) {
  return (state$: Observable<CreditRequestState>) => state$
    .let(_getCreditRequestEntities())
    .map(entities => creditRequestIds.map(id => entities[id]));
}

function _getCreditRequestIds() {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.ids);
}

function _getCreditRequestCollection() {
  return (state$: Observable<CreditRequestState>) => state$
    .let(_getCreditRequestIds())
    .switchMap((ids) => state$.let(_getCreditRequests(ids))
    );
}

function _getOfferClicksLoaded() {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.loadedClicks);
}

function _getOfferClickEntities() {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.offerEntitites);
}

function _getOfferClicks(offerIds: string[]) {
  return (state$: Observable<CreditRequestState>) => state$
    .let(_getOfferClickEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

function _getOfferClickIds() {
  return (state$: Observable<CreditRequestState>) => state$
    .select(s => s.offerIds);
}

function _getOfferClickCollection() {
  return (state$: Observable<CreditRequestState>) => state$
    .let(_getOfferClickIds())
    .switchMap((ids) => state$.let(_getOfferClicks(ids))
    );
}

function _getCreditRequestState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.creditRequest);
}

export function getCreditRequest(creditRequestId: string) {
  return compose(_getCreditRequest(creditRequestId), _getCreditRequestState());
}

export function getCreditRequests(creditRequestIds: string[]) {
  return compose(_getCreditRequests(creditRequestIds), _getCreditRequestState());
}

export function getCreditRequestCollection() {
  return compose(_getCreditRequestCollection(), _getCreditRequestState());
}

export function getOfferClicksLoaded() {
  return compose(_getOfferClicksLoaded(), _getCreditRequestState());
}

export function getOfferClickCollection() {
  return compose(_getOfferClickCollection(), _getCreditRequestState());
}
