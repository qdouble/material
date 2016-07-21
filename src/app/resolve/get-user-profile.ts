import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../actions';
import { User } from '../models';
import { AppState, getUser, getUserLoaded } from '../reducers';

@Injectable()

export class GetUserProfile {
  loaded$: Observable<boolean>;
  loaded: boolean;
  user$: Observable<User>;
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
  ) { }
  resolve() {
    this.loaded$ = this.store.let(getUserLoaded());
    this.loaded$.take(1).subscribe(loaded => {
      this.loaded = loaded;
    });
    if (!this.loaded) {
      this.store.dispatch(this.userActions.getProfile());
    }
    this.user$ = this.store.let(getUser());
    return Observable.of(this.user$);
  }
}
