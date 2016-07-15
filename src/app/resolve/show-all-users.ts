import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TestRequestActions } from '../actions';
import { AppState, getTestRequestAllUsers } from '../reducers';

@Injectable()

export class ShowAllUsers {
  users$: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private testActions: TestRequestActions
    ) {
      store.dispatch(this.testActions.showAllUsers());
      this.users$ = this.store.let(getTestRequestAllUsers());
    }
    resolve() {
      return this.users$.take(1);
  }
}
