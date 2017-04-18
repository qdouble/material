/* tslint:disable: member-ordering */
import { Injectable, Injector } from '@angular/core';
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
    private injector: Injector,
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
      .catch(() => Observable.of(
        this.userActions.adminLoginFail(user)
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
        this.userActions.changeSelectedPrizeFail(err)
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
      .catch((res) => Observable.of(
        this.userActions.checkIfUserUpdatedFail(res)
      ))
    );

  @Effect() checkIPMatch$ = this.actions$
    .ofType(UserActions.CHECK_IP_MATCH)
    .map(action => action.payload)
    .switchMap(() => this.userService.checkIPMatch()
      .map((res) => this.userActions.checkIPMatchSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.checkIPMatchFail(res)
      ))
    );

  @Effect() checkLoggedIn$ = this.actions$
    .ofType(UserActions.CHECK_LOGGED_IN)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.checkLoggedIn()
      .map((res: any) => this.userActions.checkLoggedInSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.checkLoggedInFail(res)
      ))
    );

  @Effect() dismissProfileChanges$ = this.actions$
    .ofType(UserActions.DISMISS_PROFILE_CHANGES)
    .map(action => <any>action.payload)
    .switchMap(() => this.userService.dismissProfileChanges()
      .map((res: any) => this.userActions.dismissProfileChangesSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.dismissProfileChangesFail(res)
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
      .catch((res) => Observable.of(
        this.userActions.forgotPasswordFail(res),
        this.notifyActions.addNotify(res)
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
      .catch((res) => Observable.of(
        this.userActions.getProfileFail(res)
      ))
    );

  @Effect() getReferral$ = this.actions$
    .ofType(UserActions.GET_REFERRAL)
    .map(action => <string>action.payload)
    .switchMap((id) => this.userService.getReferral(id)
      .map((res: any) => this.userActions.getReferralSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.getReferralFail(res)
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
        if (res.payload.redirectTo) {
          this.store.dispatch(go([res.payload.redirectTo]));
        }
        if (res.payload.redirectTo === 'status') {
          this.store.dispatch(go([res.payload.redirectTo]));
          this.store.dispatch(this.offerActions.clearOffers());
        }
      })
      .catch((err) => Observable.of(
        this.userActions.loginFail(err)
      ))
    );

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.logout()
      .map(() => this.userActions.logoutSuccess())
      .do(() => this.store.dispatch(go([''])))
      .catch((res) => Observable.of(
        this.userActions.logoutFail(res)
      ))
    );

  @Effect() recordClick$ = this.actions$
    .ofType(UserActions.RECORD_CLICK)
    .map(action => <string>action.payload)
    .switchMap(offer => this.userService.recordClick(offer)
      .map(res => this.userActions.recordClickSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        window.location.replace(res.payload.redirectTo) : null)
      .catch((res) => Observable.of(
        this.userActions.recordClickFail(res)
      ))
    );

  @Effect() register$ = this.actions$
    .ofType(UserActions.REGISTER)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.registerUser(user)
      .map(res => this.userActions.registerSuccess(res))
      .do(res => {
        if (res.payload.redirectTo) {
          this.store.dispatch(go([res.payload.redirectTo, { new: true }]));
        }
        if (!res.payload.success) {
          this.store.dispatch(this.notifyActions.addNotify(res.payload));
        }
      })
      .catch((res) => Observable.of(
        this.userActions.registerFail(res)
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
      .catch((res) => Observable.of(
        this.userActions.resetPasswordFail(res),
        this.notifyActions.addNotify(res)
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
      .catch((res) => Observable.of(
        this.userActions.setSponsorFail(res)
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
      .catch((res) => Observable.of(
        this.userActions.updateProfileFail(res)
      ))
    );

}
