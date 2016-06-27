import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserLoggedIn } from '../reducers';

@Injectable()

export class AuthGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  loggedIn: boolean;
  constructor(private store: Store<AppState>, private router: Router) {
    this.loggedIn$ = store.let(getUserLoggedIn());
    this.loggedIn$.subscribe(val => {
      this.loggedIn = val;
    });
  }
  canActivate() {
    if (!this.loggedIn) {
      this.router.navigateByUrl('login');
    }
    return this.loggedIn;
  }
}
