/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { UserActions } from '../actions/user';
import { Credit } from '../models/credit';
import { Referral } from '../models/referral';
import { User } from '../models/user';

export interface UserState {
  creditIds: string[];
  credits: { [id: string]: Credit };
  creditTotal: number;
  entryEmail: string | null;
  loading: boolean;
  loaded: boolean;
  loginChecked: boolean;
  loggedIn: boolean | null;
  onAdminPage: boolean;
  referredBy: string | null;
  referralIds: string[];
  referrals: { [id: string]: Referral };
  settingPrize: boolean;
  user: User;
};

export const initialState: UserState = {
  creditIds: [],
  credits: {},
  creditTotal: 0,
  entryEmail: null,
  loading: false,
  loaded: false,
  loginChecked: false,
  loggedIn: null,
  onAdminPage: false,
  referredBy: null,
  referralIds: [],
  referrals: {},
  settingPrize: false,
  user: {}
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.CHANGE_SELECTED_PRIZE:
      return Object.assign({}, state, { settingPrize: true });

    case UserActions.CHANGE_SELECTED_PRIZE_FAIL:
      return Object.assign({}, state, { settingPrize: false });

    case UserActions.CHANGE_SELECTED_PRIZE_SUCCESS:
      let id = action.payload.id;
      if (!id) return Object.assign({}, state, { settingPrize: false });
      return Object.assign({}, state, {
        loading: false, user: Object.assign({}, state.user,
          { selectedPrize: id, settingPrize: false })
      });

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

    case UserActions.CHECK_LOGGED_IN_SUCCESS: {
      return Object.assign({}, state, {
        loginChecked: true,
        loggedIn: !!action.payload
      });
    }

    case UserActions.DISMISS_PROFILE_CHANGES_SUCCESS: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { profilePending: false })
      });
    }

    case UserActions.GET_PROFILE: {
      return Object.assign({}, state, { loading: true });
    }

    case UserActions.GET_PROFILE_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case UserActions.GET_PROFILE_SUCCESS: {
      let user: User = action.payload;
      if (!user) return Object.assign({}, state, { loading: false });
      let userOnly = Object.assign({}, user);
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
        creditIds: creditIds,
        credits: creditEntities,
        loaded: true,
        loading: false,
        referralIds: user.referralIds || [],
        referrals: user.referrals || {},
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

    case UserActions.SET_ADMIN_LOGIN_PAGE:
      return Object.assign({}, state, {
        onAdminPage: action.payload
      });

    case UserActions.SET_CREDIT_TOTAL:
      return Object.assign({}, state, {
        creditTotal: action.payload
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

function _getSettingPrize() {
  return (state$: Observable<UserState>) => state$
    .select(s => s.settingPrize);
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

export function getReferralCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getReferralIds())
    .switchMap(id => state$.let(getReferrals(id)));
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