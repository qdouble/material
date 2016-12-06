/* tslint:disable: member-ordering */
import { Injectable, Injector } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../actions/user';
import { User } from '../models/user';
import { AppState } from '../reducers';
import { UserService } from '../services/user';
import { NotifyActions } from '../actions/notify';

@Injectable()

export class UserEffects {
  constructor(
    public actions$: Actions,
    private injector: Injector,
    private notifyActions: NotifyActions,
    private store: Store<AppState>,
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

  @Effect() getProfile$ = this.actions$
    .ofType(UserActions.GET_PROFILE)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.getProfile()
      .map((res: any) => this.userActions.getProfileSuccess(res.user))
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
        res['message_type'] !== 'success' ? this.notifyActions.addNotify(res) : null
      ))
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo])) : null)
      .catch(() => Observable.of(
        this.userActions.loginFail(user)
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
