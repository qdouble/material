import {
  AfterContentInit, Component, ChangeDetectorRef, OnInit,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Store } from '@ngrx/store';

import { UserActions } from './actions';
import {
  AppState,
  getUserLoaded,
  getUserLoading,
  getUserLoggedIn,
  getUserReferredBy
} from './reducers';
import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit, OnInit {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS)
  );
  // Nav menu related //
  initView = true;
  previousView;
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  /////////////////////
  userLoading$: Observable<boolean>;
  userLoaded$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  HMR = HMR;
  loaded: boolean;
  loggedIn: boolean;
  referredBy: string;
  views = views;
  @ViewChild(MdSidenav) sidenav: MdSidenav;
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
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
}
