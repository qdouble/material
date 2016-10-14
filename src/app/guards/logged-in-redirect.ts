import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserLoggedIn } from '../reducers';

@Injectable()

export class LoggedInRedirectGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) { }
  isLoggedIn(): Observable<boolean> {
    return this.store.let(getUserLoggedIn())
      .filter(loaded => loaded !== null)
      .take(1);
  }
  canActivate() {
    this.loggedIn$ = this.store.let(getUserLoggedIn());
    this.loggedIn$.filter(loggedIn => loggedIn !== null)
      .take(1).subscribe(loggedIn => {
        if (loggedIn) {
          this.router.navigateByUrl('profile');
        }
      });
    return !!this.isLoggedIn();
  }
}
