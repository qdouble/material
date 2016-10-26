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

  @Effect() checkEmail$ = this.actions$
    .ofType(UserActions.CHECK_EMAIL)
    .map(action => <string>action.payload)
    .switchMap(email => this.userService.checkEmail(email)
      .map((res: any) => this.userActions.checkEmailSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo])) : null)
      .catch(() => Observable.of(
        this.userActions.checkEmailFail(email)
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

  @Effect() getProfile$ = this.actions$
    .ofType(UserActions.GET_PROFILE)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.getProfile()
      .map((res: any) => this.userActions.getProfileSuccess(res.user))
      .catch((res) => Observable.of(
        this.userActions.getProfileFail(res)
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
      .do((res: any) => res.payload.redirectTo ?
        this.store.dispatch(go([res.payload.redirectTo])) : null)
      .catch((res) => Observable.of(
        this.userActions.registerFail(res)
      ))
    );

  @Effect() updateProfile$ = this.actions$
    .ofType(UserActions.UPDATE_PROFILE)
    .map(action => <User>action.payload)
    .switchMap(user => this.userService.updateProfile(user)
      .map(res => this.userActions.updateProfileSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.updateProfileFail(res)
      ))
    );

}
