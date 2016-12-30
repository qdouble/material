import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import { Credit } from './models/credit';
import { Notify } from './models/notify';
import { PrizeActions } from './actions/prize';
import { UIActions } from './actions/ui';
import { UserActions } from './actions/user';
import { getUILatestVersion, getUIVersion } from './reducers/ui';

import {
  getUserOnAdminPage, getUserLoaded, getUserLoading, getUserLoggedIn, getUserReferredBy
} from './reducers/user';
import { getCreditCollection } from './reducers/user';
import { getNotifyCollection } from './reducers/notify';
import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS)
  );
  // Nav menu related //
  initView = true;
  previousView;
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  /////////////////////
  actionButtonLabel: string = 'Close';
  action: boolean = false;
  /////////////////////
  stopChecking$: Subject<any> = new Subject<any>();
  destroyed$: Subject<any> = new Subject<any>();
  credits$: Observable<Credit[]>;
  onAdminLoginPage$: Observable<boolean>;
  HMR = HMR;
  latestVersion$: Observable<string>;
  loaded: boolean;
  loggedIn: boolean;
  notifications$: Observable<Notify[]>;
  referredBy: string;
  snackRefs = [];
  updatedAt: string;
  updatedAt$: Observable<string>;
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  version: string;
  version$: Observable<string>;
  views = views;
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private prizeActions: PrizeActions,
    public snackBar: MdSnackBar,
    private store: Store<AppState>,
    private uiActions: UIActions,
    private userActions: UserActions
  ) {
    let active$ = store.select(s => s.user.user.active);
    active$.takeUntil(this.destroyed$)
      .filter(active => active === false)
      .subscribe(active => {
        this.store.dispatch(this.userActions.logout());
      });
    this.version$ = store.let(getUIVersion());
    this.version$.subscribe(v => this.version = v);
    this.latestVersion$ = store.let(getUILatestVersion());
    this.latestVersion$
      .filter(v => v !== null)
      .takeUntil(this.destroyed$)
      .subscribe(latestVersion => {
        if (latestVersion !== this.version) {
          window.location.reload();
        }
      });
    let checkServer$ = Observable.interval(60000);
    checkServer$
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.store.dispatch(this.uiActions.getVersion());
        if (this.loggedIn) {
          this.store.dispatch(this.userActions.checkIfUserUpdated());
        }
      });

    this.updatedAt$ = store.select(s => s.user.updatedAt);
    this.updatedAt$
      .takeUntil(this.destroyed$)
      .subscribe(updatedAt => {
        this.updatedAt = updatedAt;
      });
    let lastUpdate$ = store.select(s => s.user.lastUpdate);
    lastUpdate$
      .filter(l => l !== null && l !== undefined)
      .takeUntil(this.destroyed$)
      .subscribe(lastUpdate => {
        if (this.updatedAt && lastUpdate !== this.updatedAt) {
          store.dispatch(userActions.getProfile());
        }
      });
    this.onAdminLoginPage$ = store.let(getUserOnAdminPage());
    this.notifications$ = store.let(getNotifyCollection());
    this.notifications$
      .takeUntil(this.destroyed$)
      .filter(notify => notify.length > 0)
      .subscribe(notify => {
        let config = new MdSnackBarConfig();
        let index = notify.length - 1;
        this.snackRefs[index] = this.snackBar.open(notify[index].message,
          this.action && this.actionButtonLabel, config);
        setTimeout(() => { this.snackRefs[index].dismiss(); }, 5000);
      });
    this.userLoaded$ = store.let(getUserLoaded());

    this.userLoaded$
      .filter(loaded => loaded === false)
      .skip(1)
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        console.log('ITS FALSE');
      });
    this.userLoading$ = store.let(getUserLoading());
    this.userLoggedIn$ = store.let(getUserLoggedIn());
    this.userLoggedIn$
      .takeUntil(this.destroyed$)
      .subscribe(l => this.loggedIn = l);
    this.userReferredBy$ = store.let(getUserReferredBy());
    this.route.queryParams
      .filter(param => param['ref'] !== undefined)
      .take(1)
      .subscribe(param => {
        this.referredBy = param['ref'];
        if (validateUserName(this.referredBy)) {
          this.store.dispatch(this.userActions.setReferredBy(this.referredBy));
        }
      });
    this.credits$ = store.let(getCreditCollection());
    this.credits$
      .takeUntil(this.destroyed$)
      .subscribe(credits => {
        let creditTotal = 0;
        credits.forEach(credit => {
          if (credit.active) {
            creditTotal += credit.creditValue;
          }
        });
        creditTotal = Math.floor(creditTotal * 100) / 100;
        this.store.dispatch(this.userActions.setCreditTotal(creditTotal));
      });
    this.store.dispatch(this.prizeActions.getPrizes());
    this.store.dispatch(this.userActions.checkLoggedIn());
  }

  ngOnInit() {
    this.store.dispatch(this.uiActions.setMobile(MOBILE));
    this.userLoaded$.subscribe(loaded => {
      this.loaded = loaded;
    });
    this.userLoggedIn$.subscribe(loggedIn => {
      if (loggedIn && !this.loaded) {
        this.store.dispatch(this.userActions.getProfile());
      }
    });
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  setToggle(view: { link?: string, show?: boolean, toggle?: boolean }) {
    if (this.previousView) this.previousView.show = false;
    if (view !== this.previousView) {
      if (!this.previousView && this.router.url.search(view.link) > - 1) {
        view.show = false;
        view.toggle = true;
      } else {
        view.show = true;
        view.toggle = false;
      }
    } else {
      if (view.show === false && !view.toggle) {
        view.toggle = true;
      } else {
        if (!view.show) {
          view.show = true;
        } else {
          view.show = false;
        }
        if (view.toggle) view.toggle = false;
      }
    }
    this.previousView = view;
    this.initView = false;
  }

  toggleMobile() {
    this.store.dispatch(this.uiActions.toggleSideNavOpen());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
