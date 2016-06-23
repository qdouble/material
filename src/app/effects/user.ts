import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Router } from '@ngrx/router';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// import { Database } from '@ngrx/db';


import { AppState } from '../reducers';
import { UserService } from '../services';
import { User } from '../models/user';
import { UserActions } from '../actions';

@Injectable()

export class UserEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private userService: UserService,
    // private db: Database,
    private userActions: UserActions,
    private router: Router
  ) { }

  @Effect() login$ = this.updates$
    .whenAction(UserActions.LOGIN)
    .map<User>(toPayload)
    .switchMap(user => this.userService.loginUser(user)
      .map(res => this.userActions.loginSuccess(res))
      .catch(() => Observable.of(
        this.userActions.loginFail(user)
      ))
    )


  @Effect() check$ = this.updates$
    .whenAction(UserActions.CHECK_EMAIL)
    .map<string>(toPayload)
    .mergeMap(email => this.userService.checkEmail(email)
      .map((res: any) => this.userActions.checkEmailSuccess(res))
      .do((res: any) => this.router.go(res.payload.redirectPath))
      .catch(() => Observable.of(
        this.userActions.checkEmailFail(email)
      ))
    );

  @Effect() getProfile$ = this.updates$
    .whenAction(UserActions.GET_PROFILE)
    .map<string>(toPayload)
    .mergeMap(id => this.userService.getProfile(id)
      .map((res:any)=> this.userActions.getProfileSuccess(res.user))
      .catch((res) => Observable.of(
        this.userActions.getProfileFail(res)
      ))
    )

  @Effect() register$ = this.updates$
    .whenAction(UserActions.REGISTER)
    .map<User>(toPayload)
    .mergeMap(user => this.userService.registerUser(user)
      .map(res => this.userActions.registerSuccess(res))
      .do((res: any) => this.router.go(res.payload.redirectPath))
      .catch((res) => Observable.of(
        this.userActions.registerFail(res)
      ))
    );

  @Effect() updateProfile$ = this.updates$
    .whenAction(UserActions.UPDATE_PROFILE)
    .map<User>(toPayload)
    .mergeMap(user => this.userService.updateProfile(user)
      .map(res => this.userActions.updateProfileSuccess(res))
      .do((res: any) => this.router.go(res.payload.redirectPath))
      .catch((res) => Observable.of(
        this.userActions.updateProfileFail(res)
      ))
    );

  // @Effect() checkRedirect$ = this.updates$
  //     .whenAction(UserActions.CHECK_EMAIL_SUCCESS)
  //     .map<any>(toPayload)
  //     .filter(res => res != '')
  //     .do(res => this.router.go(res.redirectPath))
  //     .filter(() => false)

}