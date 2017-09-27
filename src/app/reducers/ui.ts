/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UIActions } from '../actions/ui';
import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { PushNotification } from '../models/push-notification';

export interface UIState {
  contactRequestSent: boolean;
  completedOrderIds: string[];
  completedOrders: { [id: string]: Order };
  creditedOfferIds: string[];
  creditedOffers: { [id: string]: Offer };
  mobile: boolean;
  pushNotification: PushNotification;
  sendingContact: boolean;
  sideNavOpen: boolean;
  latestVersion: string;
  version: string;
}

export const initialState: UIState = {
  contactRequestSent: false,
  completedOrderIds: [],
  completedOrders: {},
  creditedOfferIds: [],
  creditedOffers: {},
  mobile: false,
  pushNotification: null,
  sendingContact: false,
  sideNavOpen: false,
  latestVersion: null,
  version: '0.4.4'
};

export function uiReducer(state = initialState, action: Action): UIState {
  switch (action.type) {

    case UIActions.CONTACT_US:
      return Object.assign({}, state, {
        contactRequestSent: false,
        sendingContact: true
      });

    case UIActions.CONTACT_US:
      return Object.assign({}, state, { sendingContact: false });

    case UIActions.CONTACT_US_SUCCESS:
      if (!action.payload.success) return Object.assign({});
      return Object.assign({}, state, {
        contactRequestSent: true,
        sendingContact: false
      });

    case UIActions.CREATE_PUSH_NOTIFICATION: {
      return Object.assign({}, state, {
        pushNotification: action.payload
      });
    }

    case UIActions.DISPLAY_COMPLETED_ORDER_DIALOG: {
      const order = action.payload.order;
      if (!order || state.completedOrderIds.includes(order.id)) return state;
      return Object.assign({}, state, {
        completedOrderIds: [...state.completedOrderIds, order.id],
        completedOrders: Object.assign({}, state.completedOrders, {
          [order.id]: order
        })
      });
    }

    case UIActions.DISPLAY_CREDITED_OFFER_DIALOG: {
      const offer = action.payload.offer;
      if (!offer || state.creditedOfferIds.includes(offer.id)) return state;
      return Object.assign({}, state, {
        creditedOfferIds: [...state.creditedOfferIds, offer.id],
        creditedOffers: Object.assign({}, state.creditedOffers, {
          [offer.id]: offer
        })
      });
    }

    case UIActions.GET_VERSION_SUCCESS:
      let version = action.payload.version;
      if (!version || typeof version !== 'string') return state;
      return Object.assign({}, state, {
        latestVersion: action.payload.version
      });

    case UIActions.MARK_COMPLETED_ORDER_AS_VIEWED: {
      const id: string = action.payload;
      if (!id || typeof id !== 'string') return state;
      return Object.assign({}, state, {
        creditedOffers: Object.assign({}, state.completedOrders, {
          [id]: Object.assign({}, state.completedOrderIds[id], { viewed: true })
        })
      });
    }

    case UIActions.MARK_CREDITED_OFFER_AS_VIEWED: {
      const id: string = action.payload;
      if (!id || typeof id !== 'string') return state;
      return Object.assign({}, state, {
        creditedOffers: Object.assign({}, state.creditedOffers, {
          [id]: Object.assign({}, state.creditedOffers[id], { viewed: true })
        })
      });
    }

    case UIActions.SET_MOBILE:
      return Object.assign({}, state, {
        mobile: action.payload,
        sideNavOpen: !action.payload
      });

    case UIActions.TOGGLE_SIDE_NAV_OPEN:
      return Object.assign({}, state, {
        sideNavOpen: !state.sideNavOpen,
      });

    default: {
      return state;
    }
  }
}

function _getCompletedOrderEntities() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.completedOrders);
}

function _getCompletedOrders(orderIds: string[]) {
  return (state$: Observable<UIState>) => state$
    .let(_getCompletedOrderEntities())
    .map(entities => orderIds.map(id => entities[id]));
}

function _getCompletedOrderIds() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.completedOrderIds);
}

function _getCreditedOfferEntities() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.creditedOffers);
}

function _getCreditedOffers(offerIds: string[]) {
  return (state$: Observable<UIState>) => state$
    .let(_getCreditedOfferEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

function _getCreditedOfferIds() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.creditedOfferIds);
}

function _getLatestVersion() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.latestVersion);
}

function _getMobile() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.mobile);
}

function _getSideNavOpen() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.sideNavOpen);
}

function _getUIState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.ui);
}

function _getVersion() {
  return (state$: Observable<UIState>) => state$
    .select(s => s.version);
}

export function getCompletedOrders(ids: string[]) {
  return compose(_getCompletedOrders(ids), _getUIState());
}

export function getCompletedOrderIds() {
  return compose(_getCompletedOrderIds(), _getUIState());
}

export function getOrderEntities() {
  return compose(_getCompletedOrderEntities(), _getUIState());
}

export function getCreditedOffers(ids: string[]) {
  return compose(_getCreditedOffers(ids), _getUIState());
}

export function getCreditedOfferIds() {
  return compose(_getCreditedOfferIds(), _getUIState());
}

export function getCreditEntities() {
  return compose(_getCreditedOfferEntities(), _getUIState());
}
export function getCompletedOrderCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCompletedOrderIds())
    .switchMap(id => state$.let(getCompletedOrders(id)));
}
export function getCreditedOfferCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCreditedOfferIds())
    .switchMap(id => state$.let(getCreditedOffers(id)));
}

export function getUILatestVersion() {
  return compose(_getLatestVersion(), _getUIState());
}

export function getUIMobile() {
  return compose(_getMobile(), _getUIState());
}

export function getUISideNavOpen() {
  return compose(_getSideNavOpen(), _getUIState());
}

export function getUIVersion() {
  return compose(_getVersion(), _getUIState());
}
