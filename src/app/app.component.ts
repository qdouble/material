import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { UserActions } from './actions';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [
    // ROUTER_DIRECTIVES // Enable for new router
  ],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class App {

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
    ) { }

  logout() {
    this.store.dispatch(this.userActions.logout())
  }
  
}
