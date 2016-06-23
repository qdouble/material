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
import { Response } from '@angular/http';
import { Router } from '@ngrx/router';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// import { Database } from '@ngrx/db';

import { AppState } from '../reducers';
import { TestRequestActions } from '../actions';
import { TestRequestService } from '../services';


@Injectable()

export class TestRequestEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private testService: TestRequestService,
    // private db: Database,
    private testActions: TestRequestActions,
    private router: Router
  ) { }

  @Effect() showAllUsers$ = this.updates$
    .whenAction(TestRequestActions.SHOW_ALL_USERS)
    .map<Response>(toPayload)
    .mergeMap(() => this.testService.showAllUsers()
      .map((res:any) => this.testActions.showAllUsersSuccess(res.users))
      .catch((res: Response) => Observable.of(
        this.testActions.showAllUsersFail(res)
      ))
    )
    

}

