import { MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer,  RouterStateSerializer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

import * as fromCountry from './country';
import * as fromCreditRequest from './credit-request';
import * as fromNotification from './notification';
import * as fromNotify from './notify';
import * as fromOfferClick from './offer-click';
import * as fromOffer from './offer';
import * as fromOrder from './order';
import * as fromPrize from './prize';
import * as fromTicket from './ticket';
import * as fromUI from './ui';
import * as fromUser from './user';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

const modules = {
  'country': fromCountry,
  'creditRequest': fromCreditRequest,
  'notification': fromNotification,
  'notify': fromNotify,
  'offer': fromOffer,
  'offerClick': fromOfferClick,
  'order': fromOrder,
  'prize': fromPrize,
  'router': routerReducer,
  'ticket': fromTicket,
  'ui': fromUI,
  'user': fromUser
};

export interface AppState {
  country: fromCountry.State;
  creditRequest: fromCreditRequest.State;
  notification: fromNotification.State;
  notify: fromNotify.State;
  offer: fromOffer.State;
  offerClick: fromOfferClick.State;
  order: fromOrder.State;
  prize: fromPrize.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  ticket: fromTicket.State;
  ui: fromUI.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  country: fromCountry.countryReducer,
  creditRequest: fromCreditRequest.creditRequestReducer,
  notification: fromNotification.notificationReducer,
  notify: fromNotify.notifyReducer,
  offer: fromOffer.offerReducer,
  offerClick: fromOfferClick.reducer,
  order: fromOrder.orderReducer,
  prize: fromPrize.prizeReducer,
  router: routerReducer,
  ticket: fromTicket.ticketReducer,
  ui: fromUI.uiReducer,
  user: fromUser.userReducer
};

/**
 * Country
 */

export const getCountryState = createFeatureSelector<fromCountry.State>('country');

export const getSelectedCountryId = createSelector(
  getCountryState,
  fromCountry.getSelectedCountry
);

export const {
  selectIds: getCountryIds,
  selectEntities: getCountryEntities,
  selectAll: getAllCountries,
  selectTotal: getTotalCountries,
} = fromCountry.adapter.getSelectors(getCountryState);

export const getCountryLoaded = createSelector(
  getCountryState,
  fromCountry.getLoaded
);

export const getCountryLoading = createSelector(
  getCountryState,
  fromCountry.getLoading
);

export const getSelectedCountry = createSelector(
  getCountryEntities,
  getSelectedCountryId,
  (entities, selectedId) => entities[selectedId]
);

export const getCountryCollection = createSelector(
  getCountryEntities,
  getCountryIds,
  (countries, ids: string[]) => ids.map(id => countries[id])
);

/**
 * Credit Request
 */

// tslint:disable-next-line:max-line-length
export const getCreditRequestState = createFeatureSelector<fromCreditRequest.State>('creditRequest');

export const getSelectedCreditRequestId = createSelector(
  getCreditRequestState,
  fromCreditRequest.getSelectedCreditRequest
);

export const {
  selectIds: getCreditRequestIds,
  selectEntities: getCreditRequestEntities,
  selectAll: getAllCreditRequests,
  selectTotal: getTotalCreditRequests,
} = fromCreditRequest.adapter.getSelectors(getCreditRequestState);

export const getCreditRequestAdded = createSelector(
  getCreditRequestState,
  fromCreditRequest.getAdded
);

export const getCreditRequestAdding = createSelector(
  getCreditRequestState,
  fromCreditRequest.getAdding
);

export const getCreditRequestLoaded = createSelector(
  getCreditRequestState,
  fromCreditRequest.getLoaded
);

export const getCreditRequestLoading = createSelector(
  getCreditRequestState,
  fromCreditRequest.getLoading
);

export const getLoadedClicks = createSelector(
  getCreditRequestState,
  fromCreditRequest.getLoadedClicks
);

export const getLoadingClicks = createSelector(
  getCreditRequestState,
  fromCreditRequest.getLoadingClicks
);

export const getSelectedCreditRequest = createSelector(
  getCreditRequestEntities,
  getSelectedCreditRequestId,
  (entities, selectedId) => entities[selectedId]
);

export const getCreditRequestCollection = createSelector(
  getCreditRequestEntities,
  getCreditRequestIds,
  (creditRequests, ids: string[]) => ids.map(id => creditRequests[id])
);

/**
 * Notification
 */

export const getNotificationState = createFeatureSelector<fromNotification.State>('notification');

export const getSelectedNotificationId = createSelector(
  getNotificationState,
  fromNotification.getSelectedNotification
);

export const {
  selectIds: getNotificationIds,
  selectEntities: getNotificationEntities,
  selectAll: getAllNotifications,
  selectTotal: getTotalNotifications,
} = fromNotification.adapter.getSelectors(getNotificationState);

export const getNotificationPending = createSelector(
  getNotificationState,
  fromNotification.getPending
);

export const getNotificationUnreadTotal = createSelector(
  getNotificationState,
  fromNotification.getUnreadTotal
);

export const getSelectedNotification = createSelector(
  getNotificationEntities,
  getSelectedNotificationId,
  (entities, selectedId) => entities[selectedId]
);

export const getNotificationCollection = createSelector(
  getNotificationEntities,
  getNotificationIds,
  (notifications, ids: string[]) => ids.map(id => notifications[id])
);

/**
 * Notify
 */

export const getNotifyState = createFeatureSelector<fromNotify.State>('notify');

export const getSelectedNotifyId = createSelector(
  getNotifyState,
  fromNotify.getSelectedNotify
);

export const {
  selectIds: getNotifyIds,
  selectEntities: getNotifyEntities,
  selectAll: getAllNotifys,
  selectTotal: getTotalNotifys,
} = fromNotify.adapter.getSelectors(getNotifyState);

export const getSelectedNotify = createSelector(
  getNotifyEntities,
  getSelectedNotifyId,
  (entities, selectedId) => entities[selectedId]
);

export const getNotifyCollection = createSelector(
  getNotifyEntities,
  getNotifyIds,
  (notifys, ids: string[]) => ids.map(id => notifys[id])
);

/**
 * OfferClick
 */

export const getOfferClickState = createFeatureSelector<fromOfferClick.State>('offerClick');

export const {
  selectIds: getOfferClickIds,
  selectEntities: getOfferClickEntities,
  selectAll: getAllOfferClicks,
  selectTotal: getTotalOfferClicks,
} = fromOfferClick.adapter.getSelectors(getOfferClickState);


export const getOfferClicksLoaded = createSelector(
  getOfferClickState,
  fromOfferClick.getLoaded
);

export const getOfferClicksLoading = createSelector(
  getOfferClickState,
  fromOfferClick.getLoading
);

export const getOfferClickCollection = createSelector(
  getOfferClickEntities,
  getOfferClickIds,
  (offerClicks, ids: string[]) => ids.map(id => offerClicks[id])
);


/**
 * Offer
 */

export const getOfferState = createFeatureSelector<fromOffer.State>('offer');

export const getSelectedOfferId = createSelector(
  getOfferState,
  fromOffer.getSelectedOffer
);

export const {
 selectIds: getOfferIds,
  selectEntities: getOfferEntities,
  selectAll: getAllOffers,
  selectTotal: getTotalOffers,
} = fromOffer.adapter.getSelectors(getOfferState);

export const getOfferLastUpdatedAt = createSelector(
  getOfferState,
  fromOffer.getLastUpdatedAt
);

export const getOfferLoaded = createSelector(
  getOfferState,
  fromOffer.getLoaded
);

export const getOfferLoadedUserOffers = createSelector(
  getOfferState,
  fromOffer.getLoadedUserOffers
);

export const getOfferLoading = createSelector(
  getOfferState,
  fromOffer.getLoading
);

export const getOfferRankUpdatedAt = createSelector(
  getOfferState,
  fromOffer.getRankUpdatedAt
);

export const getSelectedOffer = createSelector(
  getOfferEntities,
  getSelectedOfferId,
  (entities, selectedId) => entities[selectedId]
);

export const getOfferUserAgent = createSelector(
  getOfferState,
  fromOffer.getUserAgent
);

export const getOfferCollection = createSelector(
  getOfferEntities,
  getOfferIds,
  (offers, ids: string[]) => ids.map(id => offers[id])
);

/**
 * Order
 */

export const getOrderState = createFeatureSelector<fromOrder.State>('order');

export const {
 selectIds: getOrderIds,
  selectEntities: getOrderEntities,
  selectAll: getAllOrders,
  selectTotal: getTotalOrders,
} = fromOrder.adapter.getSelectors(getOrderState);

export const getOrderLoaded = createSelector(
  getOrderState,
  fromOrder.getLoaded
);

export const getOrderLoading = createSelector(
  getOrderState,
  fromOrder.getLoading
);

export const getOrderPlacing = createSelector(
  getOrderState,
  fromOrder.getPlacing
);

export const getOrderCollection = createSelector(
  getOrderEntities,
  getOrderIds,
  (orders, ids: string[]) => ids.map(id => orders[id])
);


/**
 * Prize
 */

export const getPrizeState = createFeatureSelector<fromPrize.State>('prize');

export const getSelectedPrizeId = createSelector(
  getPrizeState,
  fromPrize.getSelectedPrize
);

export const {
 selectIds: getPrizeIds,
  selectEntities: getPrizeEntities,
  selectAll: getAllPrizes,
  selectTotal: getTotalPrizes,
} = fromPrize.adapter.getSelectors(getPrizeState);


export const getPrizeLoaded = createSelector(
  getPrizeState,
  fromPrize.getLoaded
);

export const getPrizeLoading = createSelector(
  getPrizeState,
  fromPrize.getLoading
);

export const getSelectedPrize = createSelector(
  getPrizeEntities,
  getSelectedPrizeId,
  (entities, selectedId) => entities[selectedId]
);


export const getPrizeCollection = createSelector(
  getPrizeEntities,
  getPrizeIds,
  (prizes, ids: string[]) => ids.map(id => prizes[id])
);

/**
 * Ticket
 */

export const getTicketState = createFeatureSelector<fromTicket.State>('ticket');

export const getSelectedTicketId = createSelector(
  getTicketState,
  fromTicket.getSelectedTicket
);

export const {
 selectIds: getTicketIds,
  selectEntities: getTicketEntities,
  selectAll: getAllTickets,
  selectTotal: getTotalTickets,
} = fromTicket.adapter.getSelectors(getTicketState);

export const getTicketAdded = createSelector(
  getTicketState,
  fromTicket.getAdded
);

export const getTicketAddedMessage = createSelector(
  getTicketState,
  fromTicket.getAddedMessage
);

export const getTicketAdding = createSelector(
  getTicketState,
  fromTicket.getAdding
);

export const getTicketAddingMessage = createSelector(
  getTicketState,
  fromTicket.getAddingMessage
);

export const getTicketLoaded = createSelector(
  getTicketState,
  fromTicket.getLoaded
);

export const getTicketLoading = createSelector(
  getTicketState,
  fromTicket.getLoading
);

export const getSelectedTicket = createSelector(
  getTicketEntities,
  getSelectedTicketId,
  (entities, selectedId) => entities[selectedId]
);

export const getTicketSortBy = createSelector(
  getTicketState,
  fromTicket.getSortBy
);

export const getTicketCollection = createSelector(
  getTicketEntities,
  getTicketIds,
  (tickets, ids: string[]) => ids.map(id => tickets[id])
);


/**
 * UI
 */

export const getUIState = createFeatureSelector<fromUI.State>('ui');

export const getUICompletedOrderIds = createSelector(
  getUIState,
  fromUI.getCompletedOrderIds
);

export const getUICompletedOrders = createSelector(
  getUIState,
  fromUI.getCompletedOrders
);

export const getUICompletedOrdersCollection = createSelector(
  getUICompletedOrders,
  getUICompletedOrderIds,
  (offers, ids: string[]) => ids.map(id => offers[id])
);

export const getUIContactRequestSent = createSelector(
  getUIState,
  fromUI.getContactRequestSent
);

export const getUICreditedOfferIds = createSelector(
  getUIState,
  fromUI.getCreditedOfferIds
);

export const getUICreditedOffers = createSelector(
  getUIState,
  fromUI.getCreditedOffers
);

export const getUICreditedOfferCollection = createSelector(
  getUICreditedOffers,
  getUICreditedOfferIds,
  (offers, ids: string[]) => ids.map(id => offers[id])
);

export const getUIInvalidCountry = createSelector(
  getUIState,
  fromUI.getInvalidCountry
);

export const getUIIPInfo = createSelector(
  getUIState,
  fromUI.getIPInfo
);

export const getUIMobile = createSelector(
  getUIState,
  fromUI.getMobile
);

export const getUIPushNotification = createSelector(
  getUIState,
  fromUI.getPushNotification
);

export const getUIScripts = createSelector(
  getUIState,
  fromUI.getScripts
);

export const getUISendingContact = createSelector(
  getUIState,
  fromUI.getSendingContact
);

export const getUISideNavOpen = createSelector(
  getUIState,
  fromUI.getSideNavOpen
);

export const getUISocialProofIds = createSelector(
  getUIState,
  fromUI.getSocialProofIds
);

export const getUISocialProofs = createSelector(
  getUIState,
  fromUI.getSocialProofs
);

export const getUISocialProofCollection = createSelector(
  getUISocialProofs,
  getUISocialProofIds,
  (proofs, ids: string[]) => ids.map(id => proofs[id])
);

export const getUISocialProofSettings = createSelector(
  getUIState,
  fromUI.getSocialProofSettings
);

export const getUILatestVersion = createSelector(
  getUIState,
  fromUI.getLatestVersion
);

export const getUIVersion = createSelector(
  getUIState,
  fromUI.getVersion
);

/**
 * User
 */

export const getUserState = createFeatureSelector<fromUser.State>('user');

export const getUserAmountPaid = createSelector(
  getUserState,
  fromUser.getAmountPaid
);

export const getUserAskQuestions = createSelector(
  getUserState,
  fromUser.getAskQuestions
);

export const getUserCreditIds = createSelector(
  getUserState,
  fromUser.getCreditIds
);

export const getUserCredits = createSelector(
  getUserState,
  fromUser.getCredits
);

export const getUserCreditCollection = createSelector(
  getUserCredits,
  getUserCreditIds,
  (credits, ids: string[]) => ids.map(id => credits[id])
);

export const getUserCreditTotal = createSelector(
  getUserState,
  fromUser.getCreditTotal
);

export const getUserEntryEmail = createSelector(
  getUserState,
  fromUser.getEntryEmail
);

export const getUserIP = createSelector(
  getUserState,
  fromUser.getIP
);

export const getUserIPJson = createSelector(
  getUserState,
  fromUser.getIPJson
);

export const getUserIsNew = createSelector(
  getUserState,
  fromUser.getIsNew
);

export const getUserLastUpdate = createSelector(
  getUserState,
  fromUser.getLastUpdate
);

export const getUserLoaded = createSelector(
  getUserState,
  fromUser.getLoaded
);

export const getUserLoading = createSelector(
  getUserState,
  fromUser.getLoading
);

export const getUserLoginChecked = createSelector(
  getUserState,
  fromUser.getLoginChecked
);

export const getUserLoggedIn = createSelector(
  getUserState,
  fromUser.getLoggedIn
);

export const getUserMatches = createSelector(
  getUserState,
  fromUser.getMatches
);

export const getUserOnAdminPage = createSelector(
  getUserState,
  fromUser.getOnAdminPage
);

export const getUserReferrerBlocked = createSelector(
  getUserState,
  fromUser.getReferrerBlocked
);

export const getUserReferredBy = createSelector(
  getUserState,
  fromUser.getReferredBy
);

export const getUserReferralIds = createSelector(
  getUserState,
  fromUser.getReferralIds
);

export const getUserReferrals = createSelector(
  getUserState,
  fromUser.getReferrals
);

export const getUserReferralCollection = createSelector(
  getUserReferrals,
  getUserReferralIds,
  (referrals, ids) => ids.map(id => referrals[id])
);

export const getUserResetEmailSent = createSelector(
  getUserState,
  fromUser.getResetEmailSent
);

export const getUserReturningUser = createSelector(
  getUserState,
  fromUser.getReturningUser
);

export const getUserSelectedPrizeId = createSelector(
  getUserState,
  fromUser.getSelectedPrize
);

export const getUserSelectedReferralId = createSelector(
  getUserState,
  fromUser.getSelectedReferral
);

export const getUserSelectedReferral = createSelector(
  getUserReferrals,
  getUserSelectedReferralId,
  (entities, selectedId) => entities[selectedId]
);

export const getSelectedReferralIds = createSelector(
  getUserState,
  fromUser.getSelectedReferralIds
);


export const getUserSettingPrize = createSelector(
  getUserState,
  fromUser.getSettingPrize
);

export const getUserShowLevelBadgeNum = createSelector(
  getUserState,
  fromUser.getShowLevelBadgeNum
);

export const getUserSortReferralBy = createSelector(
  getUserState,
  fromUser.getSortReferralBy
);

export const getUserTestShowRefRandom = createSelector(
  getUserState,
  fromUser.getTestShowRefRandom
);

export const getUserUpdatedAt = createSelector(
  getUserState,
  fromUser.getUpdatedAt
);

export const getUserProfile = createSelector(
  getUserState,
  fromUser.getUser
);

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}


// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export function resetOnLogout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state, action) {
    let newState;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key]['initialState'];
      });
    }
    return reducer(newState || state, action);
  };
}

export const DEV_REDUCERS: MetaReducer<AppState>[] = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1) {
  DEV_REDUCERS.push(storeLogger());
}

