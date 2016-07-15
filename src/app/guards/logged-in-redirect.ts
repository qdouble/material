import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserLoggedIn } from '../reducers';

@Injectable()

export class LoggedInRedirectGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  loggedIn: boolean;
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate() {
    this.loggedIn$ = this.store.let(getUserLoggedIn());
    this.loggedIn$.take(1).subscribe(val => {
      this.loggedIn = val;
    });
    if (this.loggedIn) {
      this.router.navigateByUrl('profile');
    }
    return !this.loggedIn;
  }
}
