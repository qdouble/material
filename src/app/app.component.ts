import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getUserLoaded, getUserLoading } from './reducers';
import { UserActions } from './actions';

@Component({
  selector: 'app-menu',
  template: `
  
    <a *ngIf="!loggedIn" linkTo="/">Home</a>
    <a *ngIf="!loggedIn" linkTo="/login">Login</a>
    <a *ngIf="!loggedIn" linkTo="/register">Register</a>
    <a *ngIf="loggedIn" linkTo="/profile">Profile</a>
    
    <button *ngIf="loggedIn" (click)="logout.emit()">Logout</button>
  
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
    // ROUTER_DIRECTIVES // Enable for new router
    AppMenu
  ],
  styles: [require('./app.scss')],
  template: `
  
  <header>
    <nav>
      <app-menu [loggedIn]="userLoaded$ | async" (logout)="logout()"></app-menu>
    </nav>
  </header>
  <main>
    <route-view></route-view>
  </main>
  <footer>
  <br><br>
  User Loaded: {{userLoaded$ | async}}<br>
  User Loading: {{userLoading$ | async}}<br>
  <a linkTo="/test-requests">Test Requests</a>
  </footer>

  `
})
export class App {
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
    ) { 
      this.userLoaded$ = store.let(getUserLoaded())
      this.userLoading$ = store.let(getUserLoading())
    }

  logout() {
    this.store.dispatch(this.userActions.logout())
  }
  
}
