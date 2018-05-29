import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  isLoggedIn(): Observable<boolean> {
    return this.store
      .pipe(select(fromStore.getUserLoggedIn))
      .filter(loaded => loaded !== null)
      .take(1);
  }
  constructor(private store: Store<fromStore.AppState>, private router: Router) {}
  canActivate() {
    this.loggedIn$ = this.store.pipe(select(fromStore.getUserLoggedIn));
    this.loggedIn$
      .filter(loggedIn => loggedIn !== null)
      .take(1)
      .subscribe(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('login');
        }
      });
    return this.isLoggedIn();
  }
}
