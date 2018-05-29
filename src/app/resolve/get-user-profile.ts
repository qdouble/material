import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/user';
import { User } from '../models/user';
import * as fromStore from '../reducers';
import { select } from '@ngrx/store';

@Injectable()
export class GetUserProfile {
  loaded$: Observable<boolean>;
  loaded: boolean;
  user$: Observable<User>;
  constructor(private store: Store<fromStore.AppState>) {}
  resolve() {
    this.loaded$ = this.store.pipe(select(fromStore.getUserLoaded));
    this.loaded$.take(1).subscribe(loaded => {
      this.loaded = loaded;
    });
    if (!this.loaded) {
      this.store.dispatch(new userActions.GetProfile());
    }
    this.user$ = this.store.pipe(select(fromStore.getUserProfile));
    return Observable.of(this.user$);
  }
}
