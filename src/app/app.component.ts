import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import {
  AppState,
  getUserLoaded,
  getUserLoading,
  getUserLoggedIn,
  getUserReferredBy
} from './reducers';
import { UserActions } from './actions';
import { RouterPatch } from './effects';
import { AppMenu } from './app-menu.component';
import { AppFooter } from './app-footer.component';
import { validateUserName } from './validators';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [
    ROUTER_DIRECTIVES,
    AppMenu,
    AppFooter,
    StoreLogMonitorComponent
  ],
  styles: [require('./app.scss')],
  template: require('./app.component.html')
})
export class App {
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  loggedIn: boolean;
  referredBy: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.userLoaded$ = store.let(getUserLoaded());
    this.userLoading$ = store.let(getUserLoading());
    this.userLoggedIn$ = store.let(getUserLoggedIn());
    this.userReferredBy$ = store.let(getUserReferredBy());
    RouterPatch.navigateByUrl.subscribe((url: string) => {
      if ((url === 'login' || url === 'register') && this.referredBy) {
        this.router.navigate([url], { queryParams: { ref: this.referredBy } });
      } else {
        this.router.navigateByUrl(url);
      }
    });
    this.router.routerState.queryParams
      .filter(param => param['ref'] !== undefined)
      .take(1)
      .subscribe(param => {
        this.referredBy = param['ref'];
        if (validateUserName(this.referredBy)) {
          this.store.dispatch(this.userActions.setReferredBy(this.referredBy));
        }
      });
    this.store.dispatch(this.userActions.checkLoggedIn());
  }

  ngAfterViewInit() {
    Observable.interval(50).take(10).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

}
