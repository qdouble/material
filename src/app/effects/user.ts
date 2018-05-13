/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import {
  tap,
  map,
  mergeMap,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { AppState } from '../reducers';

import { SetNotificationUnreadTotal } from '../actions/notification';
import { AddNotify } from '../actions/notify';
import { ClearOffers } from '../actions/offer';
import { Go } from '../actions/router';
import {
  AdminLogin,
  AdminLoginFail,
  AdminLoginSuccess,
  AskQuestions,
  ChangeSelectedPrize,
  ChangeSelectedPrizeFail,
  ChangeSelectedPrizeSuccess,
  CheckIfUserUpdatedFail,
  CheckIfUserUpdatedSuccess,
  CheckIPMatch,
  CheckIPMatchFail,
  CheckIPMatchSuccess,
  CheckLoggedInFail,
  CheckLoggedInSuccess,
  CheckReferrerUsername,
  CheckReferrerUsernameFail,
  CheckReferrerUsernameSuccess,
  DismissProfileChangesFail,
  DismissProfileChangesSuccess,
  ForgotPassword,
  ForgotPasswordFail,
  ForgotPasswordSuccess,
  HideReferrals,
  HideReferralsFail,
  HideReferralsSuccess,
  GetProfileFail,
  GetProfileSuccess,
  GetReferral,
  GetReferralFail,
  GetReferralSuccess,
  Login,
  LoginFail,
  LoginSuccess,
  LogoutFail,
  LogoutSuccess,
  RecordClick,
  RecordClickFail,
  RecordClickSuccess,
  Register,
  RegisterFail,
  RegisterSuccess,
  RemoveReferrals,
  RemoveReferralsSuccess,
  ResetPassword,
  ResetPasswordFail,
  ResetPasswordSuccess,
  SetSponsor,
  SetSponsorFail,
  SetSponsorSuccess,
  TestShowRefRandom,
  UpdateProfile,
  UpdateProfileFail,
  UpdateProfileSuccess,
  UserActionTypes
} from '../actions/user';
import { UserService } from '../services/user';

@Injectable()

export class UserEffects {
  constructor(
    public actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) { }

  @Effect() adminLogin$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.AdminLogin),
    map((action: AdminLogin) => action.payload),
    switchMap(user => this.userService.loginAdmin(user).pipe(
      tap((res) => {
        if (res['redirectTo']) {
          window.location.href = res['redirectTo'];
        }
      }),
      mergeMap(res => concat(
        Observable.of(new AdminLoginSuccess(res)),
        // tslint:disable-next-line:max-line-length
        Observable.of(res['message_type'] !== 'success' ? new AddNotify(res) : { type: 'Empty Action' })
      )
      ),
      catchError((err) => concat(
        Observable.of(new AdminLoginFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() changeSelectedPrize$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.ChangeSelectedPrize),
    map((action: ChangeSelectedPrize) => action.payload),
    switchMap(id => this.userService.changeSelectedPrize(id).pipe(
      map((res) => new ChangeSelectedPrizeSuccess(res)),
      catchError((err) => concat(
        Observable.of(new ChangeSelectedPrizeFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() checkIfUserUpdated$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.CheckIfUserUpdated),
    switchMap(() => this.userService.checkIfUserUpdated().pipe(
      map((res) => new CheckIfUserUpdatedSuccess(res)),
      catchError((err) => Observable.of(new CheckIfUserUpdatedFail(err)))
    )));

  @Effect() checkIPMatch$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.CheckIPMatch),
    map((action: CheckIPMatch) => action.payload),
    switchMap((sponsor) => this.userService.checkIPMatch(sponsor).pipe(
      map((res) => new CheckIPMatchSuccess(res)),
      catchError((err) => Observable.of(new CheckIPMatchFail(err)))
    )));

  @Effect() checkLoggedIn$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.CheckLoggedIn),
    switchMap(() => this.userService.checkLoggedIn().pipe(
      map((res) => new CheckLoggedInSuccess(res)),
      catchError((err) => concat(
        Observable.of(new CheckLoggedInFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() checkReferrerUsername$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.CheckReferrerUsername),
    map((action: CheckReferrerUsername) => action.payload),
    switchMap(username => this.userService.checkReferrerUsername(username).pipe(
      map((res) => new CheckReferrerUsernameSuccess(res)),
      catchError((err) => Observable.of(new CheckReferrerUsernameFail(err)))
    )));

  @Effect() dismissProfileChanges$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.DismissProfileChanges),
    switchMap(() => this.userService.dismissProfileChanges().pipe(
      map((res) => new DismissProfileChangesSuccess(res)),
      catchError((err) => concat(
        Observable.of(new DismissProfileChangesFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() forgotPassword$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.ForgotPassword),
    map((action: ForgotPassword) => action.payload),
    switchMap((email) => this.userService.forgotPassword(email).pipe(
      mergeMap(res => concat(
        Observable.of(new ForgotPasswordSuccess(res)),
        Observable.of(new AddNotify(res)))
      ),
      tap((res) => res.payload.redirectTo ?
        this.store.dispatch(
          new Go({ path: [res.payload.redirectTo], extras: { preserveQueryParams: true } }))
        : null),
      catchError((err) => concat(
        Observable.of(new ForgotPasswordFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() hideReferrals$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.HideReferrals),
    map((action: HideReferrals) => <{ ids: string[], hide: boolean }>action.payload),
    switchMap((hideRefs) => this.userService.hideReferrals(hideRefs).pipe(
      map((res) => new HideReferralsSuccess(res)),
      catchError((err) => Observable.of(new HideReferralsFail(err)))
    )));

  @Effect() getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GetProfile),
    switchMap(() => this.userService.getProfile().pipe(
      mergeMap((res) => concat(
        Observable.of(new SetNotificationUnreadTotal(res)),
        Observable.of(new GetProfileSuccess(res)))
      ),
      catchError((err) => Observable.of(new GetProfileFail(err)))
    )));

  @Effect() getReferral$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GetReferral),
    map((action: GetReferral) => action.payload),
    switchMap((id) => this.userService.getReferral(id).pipe(
      map((res) => new GetReferralSuccess(res)),
      catchError((err) => concat(
        Observable.of(new GetReferralFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.Login),
    map((action: Login) => action.payload),
    switchMap(user => this.userService.loginUser(user).pipe(
      mergeMap(res => concat(
        Observable.of(new LoginSuccess(res)),
        Observable.of(new AddNotify(res)))
      ),
      tap((res: any) => {
        if (res.payload.askQuestions) {
          this.store.dispatch(new AskQuestions());
        }
        if (res.payload.redirectTo === 'offers') {
          // let showTestRand = Math.floor(Math.random() * 2);
          let showTestRand = 1;
          this.store.dispatch(new ClearOffers());
          this.store.dispatch(new Go({
            path: [res.payload.redirectTo],
            query: { new: true, returning: true, showRefT: showTestRand }
          }));
          this.store.dispatch(new TestShowRefRandom(showTestRand));
          return;
        }
        if (res.payload.redirectTo) {
          this.store.dispatch(new Go({ path: ['/offers'] }));
          this.store.dispatch(new ClearOffers());
        }
      }),
      catchError((err) => concat(
        Observable.of(new LoginFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() logout$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.Logout),
    switchMap(() => this.userService.logout().pipe(
      map(() => new LogoutSuccess()),
      tap(() => this.store.dispatch(new Go({ path: ['/'] }))),
      catchError((err) => concat(
        Observable.of(new LogoutFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() recordClick$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.RecordClick),
    map((action: RecordClick) => action.payload),
    switchMap(offer => this.userService.recordClick(offer).pipe(
      mergeMap(res => concat(
        Observable.of(new RecordClickSuccess(res)),
        Observable.of(new AddNotify(res)))
      ),
      tap((res) => {
        let redirectTo = res.payload.redirectTo;
        if (redirectTo === '/crediting-guidelines') {
          this.store.dispatch(new Go({ path: [redirectTo, { match: true }] }));
        } else if (redirectTo === '/offers') {
          window.close();
        } else if (redirectTo) {
          window.location.replace(redirectTo);
        }
      }),
      catchError((err) => concat(
        Observable.of(new RecordClickFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() register$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.Register),
    map((action: Register) => action.payload),
    switchMap(user => this.userService.registerUser(user).pipe(
      map(res => new RegisterSuccess(res)),
      tap((res: any) => {
        if (res.payload.redirectTo) {
          // let showTestRand = Math.floor(Math.random() * 2);
          let showTestRand = 1;
          this.store.dispatch(new Go({
            path: [res.payload.redirectTo,
            { new: true, showRefT: showTestRand }]
          }));
          this.store.dispatch(new TestShowRefRandom(showTestRand));
        }
        if (!res.payload.success) {
          this.store.dispatch(new AddNotify(res.payload));
        }
      }),
      catchError((err) => concat(
        Observable.of(new RegisterFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() removeReferrals$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.RemoveReferrals),
    map((action: RemoveReferrals) => action.payload),
    switchMap((ids) => this.userService.removeReferrals(ids).pipe(
      mergeMap((res) => Observable.of(new RemoveReferralsSuccess(res))),
      catchError((err) => Observable.of(new HideReferralsFail(err)))
    )));

  @Effect() resetPassword$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.ResetPassword),
    map((action: ResetPassword) => action.payload),
    switchMap((email) => this.userService.resetPassword(email).pipe(
      mergeMap(res => concat(
        Observable.of(new ResetPasswordSuccess(res)),
        Observable.of(new AddNotify(res)))
      ),
      tap((res) => res.payload.redirectTo ?
        this.store.dispatch(new Go({ path: [res.payload.redirectTo] })) : null),
      catchError((err) => concat(
        Observable.of(new ResetPasswordFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() setSponsor$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.SetSponsor),
    map((action: SetSponsor) => action.payload),
    switchMap(sponsor => this.userService.setSponsor(sponsor).pipe(
      mergeMap(res => concat(
        Observable.of(new SetSponsorSuccess(res)),
        Observable.of(res['message'] ? new AddNotify(res) : null)
      )),
      catchError((err) => concat(
        Observable.of(new SetSponsorFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));

  @Effect() updateProfile$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.UpdateProfile),
    map((action: UpdateProfile) => action.payload),
    switchMap(user => this.userService.updateProfile(user).pipe(
      mergeMap(res => concat(
        Observable.of(new UpdateProfileSuccess(res)),
        Observable.of(new AddNotify(res))
      )),
      catchError((err) => concat(
        Observable.of(new UpdateProfileFail(err)),
        Observable.of(new AddNotify(err)))
      )
    )));
}
