import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../reducers';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class AuthRegGuard implements CanActivate {
  loggedIn$: Observable<boolean>;
  isLoggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserLoggedIn),
      filter(loaded => loaded !== null),
      take(1)
    );
  }
  constructor(private store: Store<fromStore.AppState>, private router: Router) {}
  canActivate() {
    this.loggedIn$ = this.store.pipe(select(fromStore.getUserLoggedIn));
    this.loggedIn$.pipe(filter(loggedIn => loggedIn !== null), take(1)).subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigateByUrl('register');
      }
    });
    return this.isLoggedIn();
  }
}
