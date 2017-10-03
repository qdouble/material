/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';

import { NotificationActions } from '../actions/notification';
import { NotifyActions } from '../actions/notify';
import { OfferActions } from '../actions/offer';
import { User } from '../models/user';
import { UserActions } from '../actions/user';
import { UserService } from '../services/user';

@Injectable()

export class UserEffects {
  constructor(
    public actions$: Actions,
    private notificationActions: NotificationActions,
    private notifyActions: NotifyActions,
    private store: Store<AppState>,
    private offerActions: OfferActions,
    private userActions: UserActions,
    private userService: UserService
  ) { }

  @Effect() adminLogin$ = this.actions$
    .ofType(UserActions.ADMIN_LOGIN)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.loginAdmin(user)
      .mergeMap(res => Observable.of(
        this.userActions.adminLoginSuccess(res),
        res['message_type'] !== 'success' ? this.notifyActions.addNotify(res) : null
      ))
      .do((res: any) => res.payload.redirectTo ?
        window.location.href = res.payload.redirectTo : null)
      .catch((err) => Observable.of(
        this.userActions.adminLoginFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() changeSelectedPrize$ = this.actions$
    .ofType(UserActions.CHANGE_SELECTED_PRIZE)
    .map(action => <string>action.payload)
    .switchMap(id => this.userService.changeSelectedPrize(id)
      .mergeMap((res: any) => Observable.of(
        this.userActions.changeSelectedPrizeSuccess(res),
        // res['message_type'] !== 'success' ? this.notifyActions.addNotify(res) : null
      ))
      .catch((err) => Observable.of(
        this.userActions.changeSelectedPrizeFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() checkEmail$ = this.actions$
    .ofType(UserActions.CHECK_EMAIL)
    .map(action => <string>action.payload)
    .switchMap(email => this.userService.checkEmail(email)
      .map((res: any) => this.userActions.checkEmailSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo], undefined,
          { preserveQueryParams: true })) : null)
      .catch((err) => Observable.of(
        this.userActions.checkEmailFail(err)
      ))
    );

  @Effect() checkIfUserUpdated$ = this.actions$
    .ofType(UserActions.CHECK_IF_USER_UPDATED)
    .map(action => action.payload)
    .switchMap(() => this.userService.checkIfUserUpdated()
      .map((res) => this.userActions.checkIfUserUpdatedSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.checkIfUserUpdatedFail(err)
      ))
    );

  @Effect() checkIPMatch$ = this.actions$
    .ofType(UserActions.CHECK_IP_MATCH)
    .map(action => action.payload)
    .switchMap((sponsor) => this.userService.checkIPMatch(sponsor)
      .map((res) => this.userActions.checkIPMatchSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.checkIPMatchFail(err)
      ))
    );

  @Effect() checkLoggedIn$ = this.actions$
    .ofType(UserActions.CHECK_LOGGED_IN)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.checkLoggedIn()
      .map((res: any) => this.userActions.checkLoggedInSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.checkLoggedInFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() checkReferrerUsername$ = this.actions$
    .ofType(UserActions.CHECK_REFERRER_USERNAME)
    .map(action => <string>action.payload)
    .switchMap(username => this.userService.checkReferrerUsername(username)
      .map((res: any) => this.userActions.checkReferrerUsernameSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.checkReferrerUsernameFail(err)
      ))
    );

  @Effect() dismissProfileChanges$ = this.actions$
    .ofType(UserActions.DISMISS_PROFILE_CHANGES)
    .map(action => <any>action.payload)
    .switchMap(() => this.userService.dismissProfileChanges()
      .map((res: any) => this.userActions.dismissProfileChangesSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.dismissProfileChangesFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() forgotPassword$ = this.actions$
    .ofType(UserActions.FORGOT_PASSWORD)
    .map(action => <string>action.payload)
    .switchMap((email) => this.userService.forgotPassword(email)
      .mergeMap(res => Observable.of(
        this.userActions.forgotPasswordSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo], undefined,
          { preserveQueryParams: true })) : null)
      .catch((err) => Observable.of(
        this.userActions.forgotPasswordFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() hideReferrals$ = this.actions$
    .ofType(UserActions.HIDE_REFERRALS)
    .map(action => <{ ids: string[], hide: boolean }>action.payload)
    .switchMap((hideRefs) => this.userService.hideReferrals(hideRefs)
      .mergeMap((res) => Observable.of(
        this.userActions.hideReferralsSuccess(res))
      )
      .catch((err) => Observable.of(
        this.userActions.hideReferralsFail(err)
      ))
    );

  @Effect() getProfile$ = this.actions$
    .ofType(UserActions.GET_PROFILE)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.getProfile()
      .mergeMap((res: any) => Observable.of(
        this.notificationActions.setNotificationTotal(res),
        this.userActions.getProfileSuccess(res))
      )
      .catch((err) => Observable.of(
        this.userActions.getProfileFail(err)
      ))
    );

  @Effect() getReferral$ = this.actions$
    .ofType(UserActions.GET_REFERRAL)
    .map(action => <string>action.payload)
    .switchMap((id) => this.userService.getReferral(id)
      .map((res: any) => this.userActions.getReferralSuccess(res))
      .catch((err) => Observable.of(
        this.userActions.getReferralFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() login$ = this.actions$
    .ofType(UserActions.LOGIN)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.loginUser(user)
      .mergeMap(res => Observable.of(
        this.userActions.loginSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .do((res: any) => {
        if (res.payload.askQuestions) {
          this.store.dispatch(this.userActions.askQuestions());
        }
        if (res.payload.redirectTo === 'offers') {
          let showRefRand = Math.floor(Math.random() * 2);
          this.store.dispatch(this.offerActions.clearOffers());
          this.store.dispatch(go([res.payload.redirectTo,
          { new: true, returning: true, showRefB: showRefRand }]));
          this.store.dispatch(this.userActions.testShowRefRandom(showRefRand));
          return;
        }
        if (res.payload.redirectTo) {
          this.store.dispatch(go([res.payload.redirectTo]));
        }
        if (res.payload.redirectTo === 'status') {
          this.store.dispatch(this.offerActions.clearOffers());
        }
      })
      .catch((err) => Observable.of(
        this.userActions.loginFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.logout()
      .map(() => this.userActions.logoutSuccess())
      .do(() => this.store.dispatch(go(['/login'])))
      .catch((err) => Observable.of(
        this.userActions.logoutFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() recordClick$ = this.actions$
    .ofType(UserActions.RECORD_CLICK)
    .map(action => <string>action.payload)
    .switchMap(offer => this.userService.recordClick(offer)
      .mergeMap(res => Observable.of(
        this.userActions.recordClickSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .do((res: any) => {
        let redirectTo = res.payload.redirectTo;
        if (redirectTo === '/crediting-guidelines') {
          this.store.dispatch(go([redirectTo], { match: true }));
        } else if (redirectTo) {
          window.location.replace(redirectTo);
        }
        this.notifyActions.addNotify(res);
      })
      .catch((err) => Observable.of(
        this.userActions.recordClickFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() register$ = this.actions$
    .ofType(UserActions.REGISTER)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.registerUser(user)
      .map(res => this.userActions.registerSuccess(res))
      .do(res => {
        if (res.payload.redirectTo) {
          let showRefRand = Math.floor(Math.random() * 2);
          this.store.dispatch(go([res.payload.redirectTo,
          { new: true, showRefB: showRefRand }]));
          this.store.dispatch(this.userActions.testShowRefRandom(showRefRand));
        }
        if (!res.payload.success) {
          this.store.dispatch(this.notifyActions.addNotify(res.payload));
        }
      })
      .catch((err) => Observable.of(
        this.userActions.registerFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() removeReferrals$ = this.actions$
    .ofType(UserActions.REMOVE_REFERRALS)
    .map(action => <string[]>action.payload)
    .switchMap((ids) => this.userService.removeReferrals(ids)
      .mergeMap((res) => Observable.of(
        this.userActions.removeReferralsSuccess(res))
      )
      .catch((err) => Observable.of(
        this.userActions.hideReferralsFail(err)
      ))
    );

  @Effect() resetPassword$ = this.actions$
    .ofType(UserActions.RESET_PASSWORD)
    .map(action => <{ email: string, code: string, password: string }>action.payload)
    .switchMap((email) => this.userService.resetPassword(email)
      .mergeMap(res => Observable.of(
        this.userActions.resetPasswordSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo])) : null)
      .catch((err) => Observable.of(
        this.userActions.resetPasswordFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() setSponsor$ = this.actions$
    .ofType(UserActions.SET_SPONSOR)
    .map(action => <string>action.payload)
    .switchMap(sponsor => this.userService.setSponsor(sponsor)
      .mergeMap(res => Observable.of(
        this.userActions.setSponsorSuccess(res),
        res['message'] ? this.notifyActions.addNotify(res) : null
      ))
      .catch((err) => Observable.of(
        this.userActions.setSponsorFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() updateProfile$ = this.actions$
    .ofType(UserActions.UPDATE_PROFILE)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.updateProfile(user)
      .mergeMap(res => Observable.of(
        this.userActions.updateProfileSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .catch((err) => Observable.of(
        this.userActions.updateProfileFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

}
