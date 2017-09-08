/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UserActions } from '../actions/user';
import { Credit } from '../models/credit';
import { IP } from '../models/ip';
import { Referral } from '../models/referral';
import { User } from '../models/user';

export interface UserState {
  amountPaid: number;
  creditIds: string[];
  credits: { [id: string]: Credit };
  creditTotal: number;
  entryEmail: string | null;
  ip: string;
  ipJson: IP;
  lastUpdate: string;
  loading: boolean;
  loaded: boolean;
  loginChecked: boolean;
  loggedIn: boolean | null;
  matches: boolean | undefined;
  onAdminPage: boolean;
  referrerBlocked: boolean;
  referredBy: string | null;
  referralIds: string[];
  referrals: { [id: string]: Referral };
  resetEmailSent: boolean;
  selectedReferralIds: string[];
  settingPrize: boolean;
  showLevelBadgeNum: number;
  sortReferralBy: { sortBy: string, reverse: boolean };
  updatedAt: string;
  user: User;
}

export const initialState: UserState = {
  amountPaid: 0,
  creditIds: [],
  credits: {},
  creditTotal: 0,
  entryEmail: null,
  ip: null,
  ipJson: null,
  lastUpdate: null,
  loading: false,
  loaded: false,
  loginChecked: false,
  loggedIn: null,
  matches: undefined,
  onAdminPage: false,
  referrerBlocked: false,
  referredBy: null,
  referralIds: [],
  referrals: {},
  resetEmailSent: false,
  selectedReferralIds: [],
  settingPrize: false,
  showLevelBadgeNum: null,
  sortReferralBy: { sortBy: 'addedOn', reverse: false },
  updatedAt: null,
  user: {}
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.ADD_CREDIT: {
      let credit: Credit = action.payload.credit;
      if (!credit || state.creditIds.includes(credit.id)) return state;
      return Object.assign({}, state, {
        creditIds: [...state.creditIds, credit.id],
        credits: Object.assign({}, state.credits, {
          [credit.id]: credit
        })
      });
    }

    case UserActions.ADD_REFERRAL: {
      let referral: Referral = action.payload.referral;
      if (!referral || state.referralIds.includes(referral.id)) return state;
      return Object.assign({}, state, {
        referralIds: [...state.referralIds, referral.id],
        referrals: Object.assign({}, state.referrals, {
          [referral.id]: referral
        })
      });
    }

    case UserActions.CHANGE_SELECTED_PRIZE:
      return Object.assign({}, state, { settingPrize: true });

    case UserActions.CHANGE_SELECTED_PRIZE_FAIL:
      return Object.assign({}, state, { settingPrize: false });

    case UserActions.CHANGE_SELECTED_PRIZE_SUCCESS: {
      let id = action.payload.id;
      if (!id) return Object.assign({}, state, { settingPrize: false });
      return Object.assign({}, state, {
        loading: false, user: Object.assign({}, state.user,
          { selectedPrize: id, settingPrize: false })
      });
    }

    case UserActions.CHECK_EMAIL:
      return Object.assign({}, state, {
        entryEmail: action.payload,
        loading: true
      });

    case UserActions.CHECK_EMAIL_FAIL: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case UserActions.CHECK_EMAIL_SUCCESS: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case UserActions.CHECK_REFERRER_USERNAME_SUCCESS: {
      if (action.payload.blocked) {
        return { ...state, referrerBlocked: true };
      }
      return state;
    }

    case UserActions.CHECK_IF_USER_UPDATED_SUCCESS: {
      let updatedAt = action.payload.updatedAt;
      if (!updatedAt) return state;
      return Object.assign({}, state, {
        lastUpdate: updatedAt
      });
    }

    case UserActions.CHECK_IP_MATCH:
    case UserActions.CHECK_IP_MATCH_FAIL:
      return Object.assign({}, state, {
        matches: undefined
      });

    case UserActions.CHECK_IP_MATCH_SUCCESS: {
      let ip: string = action.payload.ip;
      let ipJson = action.payload.ipJson;
      let matches: boolean = action.payload.matches;
      if (matches === undefined) return state;
      return Object.assign({}, state, {
        ip: ip,
        ipJson: ipJson,
        matches: matches
      });
    }

    case UserActions.CHECK_LOGGED_IN_SUCCESS: {
      return Object.assign({}, state, {
        loginChecked: true,
        loggedIn: !!action.payload
      });
    }

    case UserActions.DESELECT_ALL_REFERRALS: {
      return { ...state, selectedReferralIds: [] };
    }

    case UserActions.DESELECT_REFERRALS: {
      const ids: string[] = action.payload;
      if (!ids || !ids.length) return state;
      let filteredIds: string[] = [...state.selectedReferralIds];
      ids.forEach(id => {
        filteredIds = [...filteredIds.filter(i => i !== id)];
      });
      return { ...state, selectedReferralIds: filteredIds };
    }

    case UserActions.DISMISS_PROFILE_CHANGES_SUCCESS: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { profilePending: false })
      });
    }

    case UserActions.FORGOT_PASSWORD:
      return Object.assign({}, state, { loading: true, resetEmailSent: false });

    case UserActions.FORGOT_PASSWORD_FAIL:
      return Object.assign({}, state, { loading: false });

    case UserActions.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, { loading: false, resetEmailSent: true });

    case UserActions.HIDE_REFERRALS_SUCCESS: {
      const ids: string[] = action.payload.ids;
      const hide: boolean = action.payload.hide;
      if (!ids || !ids.length || hide === undefined) return state;
      let refsMod = { ...state.referrals };
      ids.forEach(id => {
        refsMod = { ...refsMod, [id]: { ...refsMod[id], hidden: hide } };
      });

      return { ...state, referrals: refsMod, selectedReferralIds: [] };
    }

    case UserActions.GET_PROFILE: {
      return Object.assign({}, state, { loading: true });
    }

    case UserActions.GET_PROFILE_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case UserActions.GET_PROFILE_SUCCESS: {
      let user: User = action.payload.user;
      if (!user) return Object.assign({}, state, { loading: false });
      let userOnly: any = Object.assign({}, user);
      delete userOnly['referrals'];
      delete userOnly['referralIds'];
      delete userOnly['credits'];
      const credits: Credit[] = user.credits || [];
      const creditIds: string[] = credits.map(credit => credit.id);
      const creditEntities = credits.reduce(
        (entities: { [id: string]: Credit }, credit: Credit) => {
          if (credit.id)
            return Object.assign(entities, {
              [credit.id]: credit
            });
        }, {});
      return Object.assign({}, state, {
        amountPaid: user.amountPaid,
        creditIds: creditIds,
        credits: creditEntities,
        lastUpdate: user.updatedAt,
        loaded: true,
        loading: false,
        referralIds: user.referralIds || [],
        referrals: user.referrals || {},
        updatedAt: user.updatedAt,
        user: userOnly
      });
    }

    case UserActions.GET_REFERRAL:
      return Object.assign({}, state, { loading: true });

    case UserActions.GET_REFERRAL_FAIL:
      return Object.assign({}, state, { loading: false });

    case UserActions.GET_REFERRAL_SUCCESS: {
      let referral = action.payload.referral;
      if (!referral || !referral.id) return Object.assign({}, state, { loading: false });
      let id = referral.id;
      let referralMod = Object.assign({}, state.referrals);
      Object.keys(referral).forEach(key => {
        if (referralMod[id][key] === undefined) {
          referralMod = Object.assign({}, referralMod, {
            [id]: Object.assign({}, referralMod[id], {
              [key]: referral[key]
            })
          });
        }
      });
      return Object.assign({}, state, {
        referrals: referralMod,
        loading: false
      });
    }

    case UserActions.LOGIN_SUCCESS:
      if (action.payload.message_type === 'success') {
        return Object.assign({}, state, {
          loggedIn: true
        });
      }
      return state;

    case UserActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, { loggedIn: false });

    case UserActions.REGISTER:
      return Object.assign({}, state, {
        loading: true
      });

    case UserActions.REGISTER_FAIL:
      return Object.assign({}, state, {
        loading: false
      });

    case UserActions.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loggedIn: action.payload.success || false
      });

    case UserActions.REMOVE_REFERRALS_SUCCESS: {
      const ids: string[] = action.payload.ids;
      if (!ids || !ids.length) return state;
      let refsMod = { ...state.referrals };
      ids.forEach(id => {
        refsMod = { ...refsMod, [id]: { ...refsMod[id], removed: true } };
      });

      return { ...state, referrals: refsMod, selectedReferralIds: [] };
      // const ids: string[] = action.payload;
      // let idsMod = [...state.referralIds];
      // let refsMod = { ...state.referrals };
      // ids.forEach(id => {
      //   idsMod = [...idsMod.filter(i => i !== id)];
      //   refsMod = { ...refsMod, [id]: undefined };
      // });
      // return { ...state, referralIds: idsMod, referrals: refsMod };
    }

    case UserActions.SELECT_REFERRALS: {
      const ids: string[] = action.payload;
      let newIds: string[] = [...state.selectedReferralIds];
      ids.forEach(id => {
        if (!newIds.includes(id)) {
          newIds = [...newIds, id];
        }
      });
      return { ...state, selectedReferralIds: newIds };
    }

    case UserActions.SET_ADMIN_LOGIN_PAGE:
      return Object.assign({}, state, {
        onAdminPage: action.payload
      });

    case UserActions.SET_AMOUNT_PAID:
      return { ...state, amountPaid: action.payload };

    case UserActions.SET_CREDIT_TOTAL:
      return Object.assign({}, state, {
        creditTotal: action.payload
      });

    case UserActions.SET_HAS_QUALFIED_REFERRALS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          hasQualifiedReferrals: action.payload
        })
      });


    case UserActions.SET_ORDER_PENDING:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          orderPending: action.payload
        })
      });

    case UserActions.SET_REFERRED_BY:
      return Object.assign({}, state, { referredBy: action.payload });

    case UserActions.SET_SPONSOR_SUCCESS: {
      let user: User = action.payload;
      if (user && user.currentSponsor && user.currentSponsorEmail) {
        return Object.assign({}, state, {
          user: Object.assign({}, state.user, {
            currentSponsor: user.currentSponsor,
            currentSponsorEmail: user.currentSponsorEmail
          })
        });
      }
      return state;
    }

    case UserActions.SHOW_LEVEL_BADGE: {
      if (!action.payload) return state;
      return {...state, showLevelBadgeNum: action.payload };
    }

    case UserActions.SORT_REFERRALS_BY: {
      return Object.assign({}, state, {
        sortReferralBy: action.payload
      });
    }

    case UserActions.UPDATE_CURRENT_LEVEL: {
      let user: User = action.payload;
      if (user.currentLevel === undefined || user.leveledUp === undefined) return state;
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          currentLevel: user.currentLevel,
          leveledUp: user.leveledUp
        })
      });
    }

    case UserActions.UPDATE_ORDER_PENDING: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          orderPending: action.payload
        })
      });
    }

    case UserActions.UPDATE_HAS_QUALIFIED_REFERRALS: {
      let user: User = action.payload;
      if (user.hasQualifiedReferrals === undefined) return state;
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          hasQualifiedReferrals: user.hasQualifiedReferrals,
          hasReferralsBeyondLevel: user.hasReferralsBeyondLevel
        })
      });
    }

    case UserActions.UPDATE_PROFILE:
      return Object.assign({}, state, {
        loading: true
      });

    case UserActions.UPDATE_PROFILE_FAIL:
      return Object.assign({}, state, {
        loading: false
      });

    case UserActions.UPDATE_PROFILE_SUCCESS: {
      const user = action.payload.user;
      if (!user) return Object.assign({}, state, { loading: false });

      let userUpdate = Object.assign({}, state.user);
      Object.keys(user).forEach(function (key, index) {
        userUpdate = Object.assign({}, userUpdate, { [key]: user[key] });
      });
      return Object.assign({}, state, {
        loading: false,
        user: userUpdate
      });
    }

    case UserActions.UPDATE_REFERRAL: {
      let referral: Referral = action.payload.referral;
      if (!referral) return state;
      return Object.assign({}, state, {
        referrals: Object.assign({}, state.referrals, {
          [referral.id]: referral
        })
      });
    }

    default: {
      return state;
    }
  }
}

function _getCreditEntities() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.credits);
}

function _getCredits(offerIds: string[]) {
  return (state$: Observable<UserState>) => state$
    .let(_getCreditEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

function _getCreditIds() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.creditIds);
}

function _getCreditTotal() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.creditTotal);
}

function _getEntryEmail() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.entryEmail);
}

function _getLevelBadgeNum() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.showLevelBadgeNum);
}

function _getLoaded() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loading);
}

function _getLoginChecked() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loginChecked);
}

function _getLoggedIn() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.loggedIn);
}

function _getOnAdminLoginPage() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.onAdminPage);
}

function _getReferrerBlocked() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referrerBlocked);
}

function _getReferredBy() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referredBy);
}

function _getReferralEntities() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referrals);
}

function _getReferral(id: string) {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referrals[id]);
}

function _getReferrals(offerIds: string[]) {
  return (state$: Observable<UserState>) => state$
    .let(_getReferralEntities())
    .map(entities => offerIds.map(id => entities[id]));
}

function _getReferralIds() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.referralIds);
}

function _getSelectedReferralIds() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.selectedReferralIds);
}

function _getSettingPrize() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.settingPrize);
}

function _getAmountPaid() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.amountPaid);
}

function _getUser() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.user);
}

function _getUserState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.user);
}

export function getUserOnAdminPage() {
  return compose(_getOnAdminLoginPage(), _getUserState());
}

export function getCredits(ids: string[]) {
  return compose(_getCredits(ids), _getUserState());
}

export function getCreditIds() {
  return compose(_getCreditIds(), _getUserState());
}

export function getCreditEntities() {
  return compose(_getCreditEntities(), _getUserState());
}

export function getCreditCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCreditIds())
    .switchMap(id => state$.let(getCredits(id)));
}

export function getCreditTotal() {
  return compose(_getCreditTotal(), _getUserState());
}

export function getLevelBadgeNum() {
  return compose(_getLevelBadgeNum(), _getUserState());
}

export function getReferral(id: string) {
  return compose(_getReferral(id), _getUserState());
}

export function getReferrals(ids: string[]) {
  return compose(_getReferrals(ids), _getUserState());
}

export function getReferralIds() {
  return compose(_getReferralIds(), _getUserState());
}

export function getReferralEntities() {
  return compose(_getReferralEntities(), _getUserState());
}

export function getReferrerBlocked() {
  return compose(_getReferrerBlocked(), _getUserState());
}

export function getReferralCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getReferralIds())
    .switchMap(id => state$.let(getReferrals(id)));
}

export function getSelectedReferralIds() {
  return compose(_getSelectedReferralIds(), _getUserState());
}

export function getAmountPaid() {
  return compose(_getAmountPaid(), _getUserState());
}

export function getUser() {
  return compose(_getUser(), _getUserState());
}

export function getUserEntryEmail() {
  return compose(_getEntryEmail(), _getUserState());
}

export function getUserLoaded() {
  return compose(_getLoaded(), _getUserState());
}

export function getUserLoading() {
  return compose(_getLoading(), _getUserState());
}

export function getUserLoginChecked() {
  return compose(_getLoginChecked(), _getUserState());
}

export function getUserLoggedIn() {
  return compose(_getLoggedIn(), _getUserState());
}

export function getUserReferredBy() {
  return compose(_getReferredBy(), _getUserState());
}

export function getUserSettingPrize() {
  return compose(_getSettingPrize(), _getUserState());
}
