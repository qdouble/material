/* tslint:disable: member-ordering */
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../actions';
import { User } from '../models';
import { AppState } from '../reducers';
import { UserService } from '../services';


@Injectable()

export class UserEffects {
  private router;
  constructor(
    public actions$: Actions,
    private injector: Injector,
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
        this.getRouter().navigateByUrl(res.payload.redirectTo) : null)
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
      .map(res => this.userActions.loginSuccess(res))
      .do((res: any) => res.payload.redirectTo ?
        this.getRouter().navigateByUrl(res.payload.redirectTo) : null)
      .catch(() => Observable.of(
        this.userActions.loginFail(user)
      ))
    );

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .map(action => <string>action.payload)
    .switchMap(() => this.userService.logout()
      .map(() => this.userActions.logoutSuccess())
      .do(() => this.getRouter().navigateByUrl(''))
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
        this.getRouter().navigateByUrl(res.payload.redirectTo) : null)
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

    getRouter() {
    if (!this.router) {
      this.router = this.injector.get(Router);
    }
    return this.router;
  }

}
