import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getUserLoaded, getUserLoading, getUserLoggedIn, getUserLoginChecked } from './reducers';
import { UserActions } from './actions';

import { RouterPatch } from './effects';

@Component({
  selector: 'app-menu',
  directives: [ROUTER_DIRECTIVES],
  template: `
  
    <a [hidden]="loggedIn" routerLink="">Home</a>
    <a [hidden]="loggedIn" routerLink="login">Login</a>
    <a [hidden]="loggedIn" routerLink="register">Register</a>
    <a [hidden]="!loggedIn" routerLink="profile">Profile</a>
    <button [hidden]="!loggedIn" (click)="logout.emit()">Logout</button>

  `
})

export class AppMenu{
  @Input() loggedIn: boolean;
  @Output() logout = new EventEmitter();
}

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [
    ROUTER_DIRECTIVES,
    AppMenu
  ],
  styles: [require('./app.scss')],
  template: `
  
  <header>
    <nav>
      <app-menu [loggedIn]="userLoggedIn$ | async" (logout)="logout()"></app-menu>
    </nav>
  </header>
  <main>
    <router-outlet></router-outlet>
  </main>
  <footer>
  <br><br>
  User Loaded: {{userLoaded$ | async}}<br>
  User Loading: {{userLoading$ | async}}<br>
  <a routerLink="test-requests">Test Requests</a>
  </footer>

  `
})
export class App {
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  loggedIn: boolean;

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private router: Router
    ) { 
      this.userLoaded$ = store.let(getUserLoaded());
      this.userLoading$ = store.let(getUserLoading());
      this.userLoggedIn$ = store.let(getUserLoggedIn());

      RouterPatch.navigateByUrl.subscribe((url: string) => {
        this.router.navigateByUrl(url)
      })

      this.store.dispatch(this.userActions.checkLoggedIn());
    }

  logout() {
    this.store.dispatch(this.userActions.logout())
  }
  
}
