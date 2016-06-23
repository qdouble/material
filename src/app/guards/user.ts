import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guard, TraversalCandidate } from '@ngrx/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../services';
import { AppState, getUserLoaded } from '../reducers';
import { UserActions } from '../actions';

@Injectable()
export class UserGuard implements Guard{
    constructor(
        private store: Store<AppState>,
        private userService: UserService,
        private userActions: UserActions
    ){}

    waitForLoaded() {
        return this.store.let(getUserLoaded())
        .filter(loaded => loaded)
        .take(1);
    }

    protectRoute({ routeParams: { id }}: TraversalCandidate) {
        return this.waitForLoaded()
            
    }
}