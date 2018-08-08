import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as userActions from '../actions/user';
import { AppState } from '../reducers';

@Component({
  selector: 'os-logout',
  template: ''
})
export class Logout {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(new userActions.Logout());
  }
}
