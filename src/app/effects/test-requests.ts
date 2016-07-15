/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { TestRequestActions } from '../actions';
import { TestRequestService } from '../services';


@Injectable()

export class TestRequestEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private testService: TestRequestService,
    private testActions: TestRequestActions
  ) { }

  @Effect() checkLoginStatus$ = this.updates$
    .whenAction(TestRequestActions.CHECK_LOGIN_STATUS)
    .map<Response>(toPayload)
    .switchMap(() => this.testService.checkLoginStatus()
      .map((res: any) => this.testActions.checkLoginStatusSuccess(res.users))
      .catch((res: Response) => Observable.of(
        this.testActions.checkLoginStatusFail(res)
      ))
    );

  @Effect() getAffiliates$ = this.updates$
    .whenAction(TestRequestActions.GET_AFFILIATES)
    .map<Response>(toPayload)
    .switchMap(() => this.testService.getAffiliates()
      .map((res: any) => this.testActions.getAffiliatesSuccess(res.data))
      .catch((res: Response) => Observable.of(
        this.testActions.getAffiliatesFail(res)
      ))
    );

  @Effect() showAllUsers$ = this.updates$
    .whenAction(TestRequestActions.SHOW_ALL_USERS)
    .map<Response>(toPayload)
    .switchMap(() => this.testService.showAllUsers()
      .map((res: any) => this.testActions.showAllUsersSuccess(res.users))
      .catch((res: Response) => Observable.of(
        this.testActions.showAllUsersFail(res)
      ))
    );
}

