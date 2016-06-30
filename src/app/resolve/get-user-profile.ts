import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserActions } from '../actions';
import { AppState, getUser } from '../reducers';

@Injectable()

export class GetUserProfile {
  user$: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
    ) {}
    resolve() {
      this.store.dispatch(this.userActions.getProfile());
      this.user$ = this.store.let(getUser());
      return Observable.of(this.user$);
  }
}
