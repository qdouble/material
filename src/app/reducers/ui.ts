/* tslint:disable: no-switch-case-fall-through */

import { UIActions, UIActionTypes } from '../actions/ui';
import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { PushNotification } from '../models/push-notification';
import { Script, GetIPInfoResponse, SocialProof, SocialProofSettings } from '../models/ui';
import { validateCountry } from '../validators/validate-country';

export interface State {
  completedOrderIds: string[];
  completedOrders: { [id: string]: Order };
  contactRequestSent: boolean;
  creditedOfferIds: string[];
  creditedOffers: { [id: string]: Offer };
  invalidCountry: boolean;
  ip: string;
  ipInfo: GetIPInfoResponse;
  mobile: boolean;
  overrideInvalidIP: string;
  pushNotification: PushNotification;
  scripts: Script[];
  sendingContact: boolean;
  sideNavOpen: boolean;
  socialProofIds: string[];
  socialProofs: { [id: string]: SocialProof };
  socialProofSettings: SocialProofSettings;
  latestVersion: string;
  version: string;
}

export const initialState: State = {
  completedOrderIds: [],
  completedOrders: {},
  contactRequestSent: false,
  creditedOfferIds: [],
  creditedOffers: {},
  invalidCountry: false,
  ip: null,
  ipInfo: null,
  mobile: false,
  overrideInvalidIP: null,
  pushNotification: null,
  scripts: null,
  sendingContact: false,
  sideNavOpen: false,
  socialProofIds: [],
  socialProofs: {},
  socialProofSettings: null,
  latestVersion: null,
  version: '0.7.1'
};

export function uiReducer(state = initialState, action: UIActions): State {
  switch (action.type) {
    case UIActionTypes.AddInvalidCountrySuccess: {
      const override = action.payload.override;
      return {
        ...state,
        overrideInvalidIP: override || ''
      };
    }

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

    case UIActionTypes.GetIPInfoSuccess: {
      let countryCode = action.payload.countryCode;
      if (!countryCode || countryCode === '') return state;
      return {
        ...state,
        invalidCountry: !validateCountry(countryCode),
        ipInfo: {
          ...action.payload,
          countryCode: countryCode === 'GB' ? 'UK' : countryCode
        }
      };
    }

    case UIActionTypes.GetScriptsToLoadSuccess: {
      let scripts = action.payload.scripts;
      if (!scripts || !Array.isArray(scripts)) return state;
      return { ...state, scripts: scripts };
    }

    case UIActionTypes.GetSocialProofSuccess: {
      const proofs = action.payload.proofs;
      if (!Array.isArray(proofs) || !proofs.map.length) return state;
      const proofEntities = proofs.reduce(
        (entities: { [id: string]: SocialProof }, proof: SocialProof) => {
          if (proof.id)
            return Object.assign(entities, {
              [proof.id]: proof
            });
        },
        {}
      );
      return {
        ...state,
        socialProofIds: [...proofs.map(p => p.id)],
        socialProofs: proofEntities
      };
    }

    case UIActionTypes.GetSocialProofSettingsSuccess: {
      const settings = action.payload;
      if (settings['message']) return state;
      return {
        ...state,
        socialProofSettings: settings
      };
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

    case UIActionTypes.OverrideInvalidCountry: {
      return {
        ...state,
        invalidCountry: false,
        ipInfo: { ...state.ipInfo, countryCode: action.payload }
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

export const getInvalidCountry = (state: State) => state.invalidCountry;

export const getIPInfo = (state: State) => state.ipInfo;

export const getLatestVersion = (state: State) => state.latestVersion;

export const getMobile = (state: State) => state.mobile;

export const getOverrideInvalidIp = (state: State) => state.overrideInvalidIP;

export const getPushNotification = (state: State) => state.pushNotification;

export const getScripts = (state: State) => state.scripts;

export const getSendingContact = (state: State) => state.sendingContact;

export const getSideNavOpen = (state: State) => state.sideNavOpen;

export const getSocialProofIds = (state: State) => state.socialProofIds;

export const getSocialProofs = (state: State) => state.socialProofs;

export const getSocialProofSettings = (state: State) => state.socialProofSettings;

export const getVersion = (state: State) => state.version;
