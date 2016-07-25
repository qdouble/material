import {
  AfterViewInit, Component, ChangeDetectorRef, OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

import { UserActions } from './actions';
import { AppMenu } from './app-menu.component';
import { AppFooter } from './app-footer.component';
import { RouterPatch } from './effects';
import {
  AppState,
  getUserLoaded,
  getUserLoading,
  getUserLoggedIn,
  getUserReferredBy
} from './reducers';
import { validateUserName } from './validators';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [
    ROUTER_DIRECTIVES,
    AppMenu,
    AppFooter,
    // StoreLogMonitorComponent
  ],
  styles: [require('./app.scss')],
  template: require('./app.component.html'),
  encapsulation: ViewEncapsulation.None
})
export class App implements AfterViewInit, OnInit {
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  loaded: boolean;
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

  ngOnInit() {
    this.userLoaded$.subscribe(loaded => {
      this.loaded = loaded;
    });
    this.userLoggedIn$.subscribe(loggedIn => {
      if (loggedIn && !this.loaded) {
        this.store.dispatch(this.userActions.getProfile());
      }
    });
  }

  ngAfterViewInit() {
    Observable.interval(50).take(10).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  activatedEvent(event) {
    console.log('Activated Event:', event);
  }

  deactivatedEvent(event) {
    console.log('Deactivated Event', event);
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

}
