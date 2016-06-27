import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserLoggedIn } from '../reducers';

@Injectable()

export class LoggedInRedirectGuard implements CanActivate {
  loggedIn$: Observable<boolean>
  loggedIn: boolean;
  constructor(private store: Store<AppState>, private router: Router) {
    this.loggedIn$ = store.let(getUserLoggedIn());
    this.loggedIn$.subscribe(val => {
      this.loggedIn = val
    })
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loggedIn) {
      this.router.navigateByUrl('profile');
    }
    return !this.loggedIn;
  }
}
