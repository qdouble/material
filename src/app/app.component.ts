import {
  AfterContentInit, Component, ChangeDetectorRef, OnInit, OnDestroy,
  ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdSidenav } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import { Notify } from './models/notify';
import { UserActions } from './actions/user';

import { getUserLoaded, getUserLoading, getUserLoggedIn, getUserReferredBy } from './reducers/user';
import { getNotifyCollection } from './reducers/notify';
import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit, OnDestroy, OnInit {
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
  destroyed$: Subject<any> = new Subject<any>();
  HMR = HMR;
  loaded: boolean;
  loggedIn: boolean;
  notifications$: Observable<Notify[]>;
  notificationSub: Subscription;
  referredBy: string;
  @ViewChild(MdSidenav) sidenav: MdSidenav;
  snackRefs = [];
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  views = views;
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MdSnackBar,
    private store: Store<AppState>,
    private userActions: UserActions,
    public viewContainerRef: ViewContainerRef
  ) {
    this.notifications$ = store.let(getNotifyCollection());
    this.notificationSub = this.notifications$
      .takeUntil(this.destroyed$)
      .filter(notify => notify.length > 0)
      .subscribe(notify => {
        let config = new MdSnackBarConfig(this.viewContainerRef);
        let index = notify.length - 1;
        this.snackRefs[index] = this.snackBar.open(notify[index].message,
          this.action && this.actionButtonLabel, config);
        setTimeout(() => { this.snackRefs[index].dismiss(); }, 5000);
      });
    this.userLoaded$ = store.let(getUserLoaded());
    this.userLoading$ = store.let(getUserLoading());
    this.userLoggedIn$ = store.let(getUserLoggedIn());
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

  ngAfterContentInit() {
    if (HMR) {
      this.sidenav.open();
    } else if (!MOBILE) {
      setTimeout(() => {
        this.sidenav.open();
      });
    }
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

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
