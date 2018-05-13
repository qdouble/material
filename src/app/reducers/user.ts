/* tslint:disable: no-switch-case-fall-through */

import { UserActions, UserActionTypes } from '../actions/user';
import { Credit } from '../models/credit';
import { IP } from '../models/ip';
import { Referral } from '../models/referral';
import { User, UserReferral } from '../models/user';

export interface State {
  amountPaid: number;
  askQuestions: boolean;
  creditIds: string[];
  credits: { [id: string]: Credit };
  creditTotal: number;
  entryEmail: string | null;
  ip: string;
  ipJson: IP;
  isNew: boolean;
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
  referrals: { [id: string]: Referral | UserReferral };
  resetEmailSent: boolean;
  returningUser: boolean;
  settingPrize: boolean;
  selectedPrize: string | null;
  selectedReferral: string | null;
  selectedReferralIds: string[];
  showLevelBadgeNum: number;
  sortReferralBy: { sortBy: string, reverse: boolean };
  testShowRefRandom: number;
  updatedAt: string;
  user: User;
}

export const initialState: State = {
  amountPaid: 0,
  askQuestions: null,
  creditIds: [],
  credits: {},
  creditTotal: 0,
  entryEmail: null,
  ip: null,
  ipJson: null,
  isNew: false,
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
  returningUser: false,
  selectedPrize: '',
  selectedReferral: null,
  selectedReferralIds: [],
  settingPrize: false,
  showLevelBadgeNum: null,
  sortReferralBy: { sortBy: 'addedOn', reverse: true },
  testShowRefRandom: null,
  updatedAt: null,
  user: {}
};

export function userReducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.AddCredit: {
      let credit = action.payload.credit;
      if (!credit || state.creditIds.includes(credit.id)) return state;
      return {
        ...state,
        creditIds: [...state.creditIds, credit.id],
        credits: { ...state.credits, [credit.id]: credit }
      };
    }

    case UserActionTypes.AddReferral: {
      let referral = action.payload.referral;
      if (!referral || state.referralIds.includes(referral.id)) return state;
      return {
        ...state,
        referralIds: [...state.referralIds, referral.id],
        referrals: { ...state.referrals, [referral.id]: referral }
      };
    }

    case UserActionTypes.AskQuestions:
      return { ...state, askQuestions: true };

    case UserActionTypes.ChangeSelectedPrize:
      return { ...state, settingPrize: true };

    case UserActionTypes.ChangeSelectedPrizeFail:
      return { ...state, settingPrize: false };

    case UserActionTypes.ChangeSelectedPrizeSuccess: {
      let id = action.payload.id;
      if (!id) return { ...state, settingPrize: false };
      return {
        ...state, loading: false,
        user: {
          ...state.user,
          selectedPrize: id,
          settingPrize: false
        }
      };
    }

    case UserActionTypes.CheckReferrerUsernameSuccess: {
      if (action.payload.blocked) {
        return { ...state, referrerBlocked: true };
      }
      return state;
    }

    case UserActionTypes.CheckIfUserUpdatedSuccess: {
      let updatedAt = action.payload.updatedAt;
      if (!updatedAt) return state;
      return { ...state, lastUpdate: updatedAt };
    }

    case UserActionTypes.CheckIPMatch:
    case UserActionTypes.CheckIPMatchFail:
      return { ...state, matches: undefined };

    case UserActionTypes.CheckIPMatchSuccess: {
      let ip: string = action.payload.ip;
      let ipJson = action.payload.ipJson;
      let matches: boolean = action.payload.matches;
      if (matches === undefined) return state;
      return {
        ...state,
        ip: ip,
        ipJson: ipJson,
        matches: matches
      };
    }

    case UserActionTypes.CheckLoggedInSuccess: {
      return {
        ...state,
        loginChecked: true,
        loggedIn: !!action.payload
      };
    }

    case UserActionTypes.DeselectAllReferrals: {
      return { ...state, selectedReferralIds: [] };
    }

    case UserActionTypes.DeselectReferrals: {
      const ids: string[] = action.payload;
      if (!ids || !ids.length) return state;
      let filteredIds: string[] = [...state.selectedReferralIds];
      ids.forEach(id => {
        filteredIds = [...filteredIds.filter(i => i !== id)];
      });
      return { ...state, selectedReferralIds: filteredIds };
    }

    case UserActionTypes.DismissProfileChangesSuccess: {
      return { ...state, user: { ...state.user, profilePending: false } };
    }

    case UserActionTypes.ForgotPassword:
      return { ...state, loading: true, resetEmailSent: false };

    case UserActionTypes.ForgotPasswordFail:
      return { ...state, loading: false };

    case UserActionTypes.ForgotPasswordSuccess:
      return { ...state, loading: false, resetEmailSent: true };

    case UserActionTypes.HideReferralsSuccess: {
      const ids: string[] = action.payload.ids;
      const hide: boolean = action.payload.hide;
      if (!ids || !ids.length || hide === undefined) return state;
      let refsMod = { ...state.referrals };
      ids.forEach(id => {
        refsMod = { ...refsMod, [id]: { ...refsMod[id], hidden: hide } };
      });

      return { ...state, referrals: refsMod, selectedReferralIds: [] };
    }

    case UserActionTypes.GetProfile: {
      return { ...state, loading: true };
    }

    case UserActionTypes.GetProfileFail: {
      return { ...state, loading: false };
    }

    case UserActionTypes.GetProfileSuccess: {
      let user: User = action.payload.user;
      if (!user) return { ...state, loading: false };
      let userOnly = { ...user };
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
      return {
        ...state,
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
      };
    }

    case UserActionTypes.GetReferral:
      return { ...state, loading: true, selectedReferral: action.payload };

    case UserActionTypes.GetReferralFail:
      return { ...state, loading: false };

    case UserActionTypes.GetReferralSuccess: {
      let referral = action.payload.referral;
      if (!referral || !referral.id) return { ...state, loading: false };
      let id = referral.id;
      let referralMod = { ...state.referrals };
      Object.keys(referral).forEach(key => {
        if (referralMod[id][key] === undefined) {
          referralMod = { ...referralMod, [id]: { ...referralMod[id], [key]: referral[key] } };
        }
      });
      return {
        ...state,
        referrals: referralMod,
        loading: false
      };
    }

    case UserActionTypes.LoginSuccess:
      if (action.payload.message_type === 'success') {
        return { ...state, loggedIn: true };
      }
      return state;

    case UserActionTypes.LogoutSuccess:
      return { ...state, loggedIn: false };

    case UserActionTypes.Register:
      return { ...state, loading: true };

    case UserActionTypes.RegisterFail:
      return { ...state, loading: false };

    case UserActionTypes.RegisterSuccess:
      return {
        ...state,
        loading: false,
        loggedIn: action.payload.success || false
      };

    case UserActionTypes.RemoveReferralsSuccess: {
      const ids: string[] = action.payload.ids;
      if (!ids || !ids.length) return state;
      let refsMod = { ...state.referrals };
      ids.forEach(id => {
        refsMod = { ...refsMod, [id]: { ...refsMod[id], removed: true } };
      });

      return { ...state, referrals: refsMod, selectedReferralIds: [] };
    }

    case UserActionTypes.ReturningUser: {
      return { ...state, returningUser: true };
    }

    case UserActionTypes.SelectPrize: {
      return { ...state, selectedPrize: action.payload };
    }

    case UserActionTypes.SelectReferrals: {
      const ids: string[] = action.payload;
      let newIds: string[] = [...state.selectedReferralIds];
      ids.forEach(id => {
        if (!newIds.includes(id)) {
          newIds = [...newIds, id];
        }
      });
      return { ...state, selectedReferralIds: newIds };
    }

    case UserActionTypes.SetAdminLoginPage:
      return { ...state, onAdminPage: action.payload };

    case UserActionTypes.SetAmountPaid:
      return { ...state, amountPaid: action.payload };

    case UserActionTypes.SetCreditTotal:
      return { ...state, creditTotal: action.payload };

    case UserActionTypes.SetHasQaulifiedReferrals:
      return { ...state, user: { ...state.user, hasQualifiedReferrals: action.payload } };


    case UserActionTypes.SetOrderPending:
      return { ...state, user: { ...state.user, orderPending: action.payload } };

    case UserActionTypes.SetReferredBy:
      return { ...state, referredBy: action.payload };

    case UserActionTypes.SetSponsorSuccess: {
      let user: User = action.payload;
      if (user && user.currentSponsor && user.currentSponsorEmail) {
        return {
          ...state,
          user: {
            ...state.user,
            currentSponsor: user.currentSponsor,
            currentSponsorEmail: user.currentSponsorEmail
          }
        };
      }
      return state;
    }

    case UserActionTypes.ShowLevelBadge: {
      if (!action.payload) return state;
      return { ...state, showLevelBadgeNum: action.payload };
    }

    case UserActionTypes.SortReferralsBy: {
      return { ...state, sortReferralBy: action.payload };
    }

    case UserActionTypes.NewEqualTrue: {
      return { ...state, isNew: action.payload };
    }

    case UserActionTypes.TestShowRefRandom: {
      return { ...state, testShowRefRandom: action.payload };
    }

    case UserActionTypes.UpdateCurrentLevel: {
      let user: User = action.payload;
      if (user.currentLevel === undefined || user.leveledUp === undefined) return state;
      return {
        ...state,
        user: {
          ...state.user,
          currentLevel: user.currentLevel,
          leveledUp: user.leveledUp
        }
      };
    }

    case UserActionTypes.UpdateOrderPending: {
      return {
        ...state,
        user: { ...state.user, orderPending: action.payload }
      };
    }

    case UserActionTypes.UpdateHasQualifiedReferrals: {
      let user: User = action.payload;
      if (user.hasQualifiedReferrals === undefined) return state;
      return {
        ...state,
        user: {
          ...state.user,
          hasQualifiedReferrals: user.hasQualifiedReferrals,
          hasReferralsBeyondLevel: user.hasReferralsBeyondLevel
        }
      };
    }

    case UserActionTypes.UpdateProfile:
      return { ...state, loading: false };

    case UserActionTypes.UpdateProfileFail:
      return { ...state, loading: false };

    case UserActionTypes.UpdateProfileSuccess: {
      const user = action.payload.user;
      if (!user) return { ...state, loading: false };

      let userUpdate = { ...state.user };
      Object.keys(user).forEach(function (key, index) {
        userUpdate = { ...userUpdate, [key]: user[key] };
      });
      return { ...state, loading: false, user: userUpdate };
    }

    case UserActionTypes.UpdateReferral: {
      let referral: Referral = action.payload.referral;
      if (!referral) return state;
      return { ...state, referrals: { ...state.referrals, [referral.id]: referral } };
    }

    default: {
      return state;
    }
  }
}

export const getAmountPaid = (state: State) => state.amountPaid;

export const getAskQuestions = (state: State) => state.askQuestions;

export const getCreditIds = (state: State) => state.creditIds;

export const getCredits = (state: State) => state.credits;

export const getCreditTotal = (state: State) => state.creditTotal;

export const getEntryEmail = (state: State) => state.entryEmail;

export const getIP = (state: State) => state.ip;

export const getIPJson = (state: State) => state.ipJson;

export const getIsNew = (state: State) => state.isNew;

export const getLastUpdate = (state: State) => state.lastUpdate;

export const getLoading = (state: State) => state.loading;

export const getLoaded = (state: State) => state.loaded;

export const getLoginChecked = (state: State) => state.loginChecked;

export const getLoggedIn = (state: State) => state.loggedIn;

export const getMatches = (state: State) => state.matches;

export const getOnAdminPage = (state: State) => state.onAdminPage;

export const getReferrerBlocked = (state: State) => state.referrerBlocked;

export const getReferredBy = (state: State) => state.referredBy;

export const getReferralIds = (state: State) => state.referralIds;

export const getReferrals = (state: State) => state.referrals;

export const getResetEmailSent = (state: State) => state.resetEmailSent;

export const getReturningUser = (state: State) => state.returningUser;

export const getSelectedPrize = (state: State) => state.selectedPrize;

export const getSelectedReferral = (state: State) => state.selectedReferral;

export const getSelectedReferralIds = (state: State) => state.selectedReferralIds;

export const getSettingPrize = (state: State) => state.settingPrize;

export const getShowLevelBadgeNum = (state: State) => state.showLevelBadgeNum;

export const getSortReferralBy = (state: State) => state.sortReferralBy;

export const getTestShowRefRandom = (state: State) => state.testShowRefRandom;

export const getUpdatedAt = (state: State) => state.updatedAt;

export const getUser = (state: State) => state.user;
