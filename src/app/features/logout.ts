import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserActions } from '../actions';
import { AppState } from '../reducers';

@Component({
  selector: 'os-logout',
  template: ''
})

export class Logout {
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.store.dispatch(this.userActions.logout());
  }
}
