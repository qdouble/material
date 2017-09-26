import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { getUserLoggedIn } from '../reducers/user';

@Injectable()

export class AuthRegGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  isLoggedIn(): Observable<boolean> {
    return this.store.let(getUserLoggedIn())
      .filter(loaded => loaded !== null)
      .take(1);
  }
  constructor(private store: Store<AppState>, private router: Router) { }
  canActivate() {
    this.loggedIn$ = this.store.let(getUserLoggedIn());
    this.loggedIn$.filter(loggedIn => loggedIn !== null)
      .take(1).subscribe(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('register');
        }
      });
    return this.isLoggedIn();
  }
}
