/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { TestRequestActions } from '../actions';
import { TestRequestService } from '../services';


@Injectable()

export class TestRequestEffects {
  constructor(
    public actions$: Actions,
    private store: Store<AppState>,
    private testService: TestRequestService,
    private testActions: TestRequestActions
  ) { }

  @Effect() checkLoginStatus$ = this.actions$
    .ofType(TestRequestActions.CHECK_LOGIN_STATUS)
    .map(action => <Response>action.payload)
    .switchMap(() => this.testService.checkLoginStatus()
      .map((res: any) => this.testActions.checkLoginStatusSuccess(res.users))
      .catch((res: Response) => Observable.of(
        this.testActions.checkLoginStatusFail(res)
      ))
    );

  @Effect() getAffiliates$ = this.actions$
    .ofType(TestRequestActions.GET_AFFILIATES)
    .map(action => <Response>action.payload)
    .switchMap(() => this.testService.getAffiliates()
      .map((res: any) => this.testActions.getAffiliatesSuccess(res.data))
      .catch((res: Response) => Observable.of(
        this.testActions.getAffiliatesFail(res)
      ))
    );

  @Effect() showAllUsers$ = this.actions$
    .ofType(TestRequestActions.SHOW_ALL_USERS)
    .map(action => <Response>action.payload)
    .switchMap(() => this.testService.showAllUsers()
      .map((res: any) => this.testActions.showAllUsersSuccess(res.users))
      .catch((res: Response) => Observable.of(
        this.testActions.showAllUsersFail(res)
      ))
    );
}

