/* tslint:disable: no-switch-case-fall-through */

import { UIActions, UIActionTypes } from '../actions/ui';
import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { PushNotification } from '../models/push-notification';
import { GetScriptsToLoadResponse, Script } from '../models/ui';

export interface State {
  completedOrderIds: string[];
  completedOrders: { [id: string]: Order };
  contactRequestSent: boolean;
  creditedOfferIds: string[];
  creditedOffers: { [id: string]: Offer };
  mobile: boolean;
  pushNotification: PushNotification;
  scripts: Script[];
  sendingContact: boolean;
  sideNavOpen: boolean;
  latestVersion: string;
  version: string;
}

export const initialState: State = {
  completedOrderIds: [],
  completedOrders: {},
  contactRequestSent: false,
  creditedOfferIds: [],
  creditedOffers: {},
  mobile: false,
  pushNotification: null,
  scripts: null,
  sendingContact: false,
  sideNavOpen: false,
  latestVersion: null,
  version: '0.5.4'
};

export function uiReducer(state = initialState, action: UIActions): State {
  switch (action.type) {

    case UIActionTypes.ContactUs:
      return {
        ...state,
        contactRequestSent: false,
        sendingContact: true
      };

    case UIActionTypes.ContactUsFail:
      return { ...state, sendingContact: false };

    case UIActionTypes.ContactUsSuccess:
      if (!action.payload.success) return { ...state, sendingContact: false };
      return {
        ...state,
        contactRequestSent: true,
        sendingContact: false
      };

    case UIActionTypes.CreatePushNotification: {
      return { ...state, pushNotification: action.payload };
    }

    case UIActionTypes.DisplayCompletedOrderDialog: {
      const order = action.payload.order;
      if (!order || state.completedOrderIds.includes(order.id)) return state;
      return {
        ...state,
        completedOrderIds: [...state.completedOrderIds, order.id],
        completedOrders: {
          ...state.completedOrders,
          [order.id]: order
        }
      };
    }

    case UIActionTypes.DisplayUnconfirmedCreditDialog:
    case UIActionTypes.DisplayCreditedOfferDialog: {
      const offer = action.payload.offer;
      if (!offer || state.creditedOfferIds.includes(offer.id)) return state;
      return {
        ...state,
        creditedOfferIds: [...state.creditedOfferIds, offer.id],
        creditedOffers: {
          ...state.creditedOffers,
          [offer.id]: offer
        }
      };
    }

    case UIActionTypes.GetScriptsToLoadSuccess: {
      let scripts = action.payload.scripts;
      if (!scripts || !Array.isArray(scripts)) return state;
      return { ...state, scripts: scripts };
    }

    case UIActionTypes.GetVersionSuccess: {
      let version = action.payload.version;
      if (!version || typeof version !== 'string') return state;
      return { ...state, latestVersion: version };
    }


    case UIActionTypes.MarkCompletedOrderAsViewed: {
      const id = action.payload;
      if (!id || typeof id !== 'string') return state;
      return {
        ...state,
        creditedOffers: {
          ...state.completedOrders,
          [id]: { ...state.completedOrderIds[id], viewed: true }
        }
      };
    }

    case UIActionTypes.MarkCreditedOfferAsViewed: {
      const id = action.payload;
      if (!id || typeof id !== 'string') return state;
      return {
        ...state,
        creditedOffers: {
          ...state.creditedOffers,
          [id]: { ...state.creditedOffers[id], viewed: true }
        }
      };
    }

    case UIActionTypes.SetMobile:
      return {
        ...state,
        mobile: action.payload,
        sideNavOpen: !action.payload
      };

    case UIActionTypes.ToggleSideNavOpen:
      return { ...state, sideNavOpen: !state.sideNavOpen };

    default: {
      return state;
    }
  }
}

export const getCompletedOrderIds = (state: State) => state.completedOrderIds;

export const getCompletedOrders = (state: State) => state.completedOrders;

export const getContactRequestSent = (state: State) => state.contactRequestSent;

export const getCreditedOfferIds = (state: State) => state.creditedOfferIds;

export const getCreditedOffers = (state: State) => state.creditedOffers;

export const getMobile = (state: State) => state.mobile;

export const getPushNotification = (state: State) => state.pushNotification;

export const getScripts = (state: State) => state.scripts;

export const getSendingContact = (state: State) => state.sendingContact;

export const getSideNavOpen = (state: State) => state.sideNavOpen;

export const getLatestVersion = (state: State) => state.latestVersion;

export const getVersion = (state: State) => state.version;
