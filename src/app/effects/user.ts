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
import { Database } from '@ngrx/db';


import { AppState } from '../reducers';
import { UserService } from '../services';
import { User } from '../models/user';
import { UserActions } from '../actions';

@Injectable() 

export class UserEffects {
    constructor(
        private updates$: StateUpdates<AppState>,
        private userService: UserService,
        private db: Database,
        private userActions: UserActions,
        private router: Router
    ){}

    @Effect() login$ = this.updates$
        .whenAction(UserActions.LOGIN)
        .map<string>(toPayload)

    @Effect() check$ = this.updates$
        .whenAction(UserActions.CHECK_EMAIL)
        .map<string>(toPayload)
        .mergeMap(email => this.userService.checkEmail(email)
            .mapTo(this.userActions.checkEmailSuccess(email))
            .catch(() => Observable.of(
                this.userActions.checkEmailFail(email)
            ))
        );

    @Effect() checkRedirect$ = this.updates$
        .whenAction(UserActions.CHECK_EMAIL_SUCCESS)
        .map<any>(toPayload)
        .do(data => console.log('data:', data))
        .filter(() => false)
}