/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../actions';
import { openInNewTab } from '../helper';
import { User } from '../models';
import { AppState } from '../reducers';
import { UserService } from '../services';

import { RouterPatch as router } from './';

@Injectable()

export class UserEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private userActions: UserActions,
    private userService: UserService
  ) { }

  @Effect() checkEmail$ = this.updates$
    .whenAction(UserActions.CHECK_EMAIL)
    .map<string>(toPayload)
    .switchMap(email => this.userService.checkEmail(email)
      .map((res: any) => this.userActions.checkEmailSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        router.navigateByUrl.next(res.payload.redirectTo) : null)
      .catch(() => Observable.of(
        this.userActions.checkEmailFail(email)
      ))
    );

  @Effect() checkLoggedIn$ = this.updates$
    .whenAction(UserActions.CHECK_LOGGED_IN)
    .map<string>(toPayload)
    .switchMap(() => this.userService.checkLoggedIn()
      .map((res: any) => this.userActions.checkLoggedInSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.checkLoggedInFail(res)
      ))
    );

  @Effect() getProfile$ = this.updates$
    .whenAction(UserActions.GET_PROFILE)
    .map<string>(toPayload)
    .switchMap(() => this.userService.getProfile()
      .map((res: any) => this.userActions.getProfileSuccess(res.user))
      .catch((res) => Observable.of(
        this.userActions.getProfileFail(res)
      ))
    );

  @Effect() login$ = this.updates$
    .whenAction(UserActions.LOGIN)
    .map<User>(toPayload)
    .switchMap(user => this.userService.loginUser(user)
      .map(res => this.userActions.loginSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        router.navigateByUrl.next(res.payload.redirectTo) : null)
      .catch(() => Observable.of(
        this.userActions.loginFail(user)
      ))
    );

  @Effect() logout$ = this.updates$
    .whenAction(UserActions.LOGOUT)
    .map<string>(toPayload)
    .switchMap(() => this.userService.logout()
      .map(() => this.userActions.logoutSuccess())
      .do(() => router.navigateByUrl.next(''))
      .catch((res) => Observable.of(
        this.userActions.logoutFail(res)
      ))
    );

  @Effect() recordClick$ = this.updates$
  .whenAction(UserActions.RECORD_CLICK)
  .map<string>(toPayload)
  .switchMap(offer => this.userService.recordClick(offer)
    .map(res => this.userActions.recordClickSuccess(res))
    .do((res: any) => res.payload.redirectTo ?
      window.location.replace(res.payload.redirectTo) : null)
    .catch((res) => Observable.of(
      this.userActions.recordClickFail(res)
    ))
  );

  @Effect() register$ = this.updates$
    .whenAction(UserActions.REGISTER)
    .map<User>(toPayload)
    .switchMap(user => this.userService.registerUser(user)
      .map(res => this.userActions.registerSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        router.navigateByUrl.next(res.payload.redirectTo) : null)
      .catch((res) => Observable.of(
        this.userActions.registerFail(res)
      ))
    );

  @Effect() updateProfile$ = this.updates$
    .whenAction(UserActions.UPDATE_PROFILE)
    .map<User>(toPayload)
    .switchMap(user => this.userService.updateProfile(user)
      .map(res => this.userActions.updateProfileSuccess(res))
      .catch((res) => Observable.of(
        this.userActions.updateProfileFail(res)
      ))
    );

}
