import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import {
  MdDialog, MdDialogRef, MdDialogConfig,
  MdSnackBar, MdSnackBarConfig
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { AppState } from './reducers';
import { Credit } from './models/credit';
import { Notify } from './models/notify';
import { PrizeActions } from './actions/prize';
import { UIActions } from './actions/ui';
import { UserActions } from './actions/user';
import { getCreditedOfferCollection, getUILatestVersion, getUIVersion } from './reducers/ui';

import {
  getUserOnAdminPage, getUserLoaded, getUserLoading, getUserLoggedIn, getUserReferredBy
} from './reducers/user';
import { getCreditCollection } from './reducers/user';
import { getNotifyCollection } from './reducers/notify';

import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { log, MOBILE, SERVICE_WORKER_SUPPORT, PUSH_MANAGER_SUPPORT } from './services/constants';
import { PushNotification } from './models/push-notification';
import { SWAndPushService } from './services/sw-and-push';

import { CreditedOfferDialog } from './features/offers/credited-offer.dialog';
import { Offer } from './models/offer';

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
  ///////// Web Sockets ////////////
  webSocket$: Subject<any>;
  closeConnection$: Subject<any> = new Subject<any>();
  ///// Completed Offer Dialog //////
  dialogRef: MdDialogRef<CreditedOfferDialog>;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  /////////////
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
    public dialog: MdDialog,
    private route: ActivatedRoute,
    private router: Router,
    private swAndPushService: SWAndPushService,
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
          log(`${latestVersion} <-> ${this.version}`);
          window.location.reload();
        }
      });
    let checkServer$ = Observable.interval(60000);
    checkServer$
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.store.dispatch(this.uiActions.getVersion());
        if (this.loggedIn) {
          // this.store.dispatch(this.userActions.checkIfUserUpdated());
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
      if (loaded && SERVICE_WORKER_SUPPORT) {
        this.swAndPushService.requestPermission();
      }
    });
    this.userLoggedIn$.subscribe(loggedIn => {
      if (loggedIn && !this.loaded) {
        this.store.dispatch(this.userActions.getProfile());
        this.connect();
      }
    });
    if (SERVICE_WORKER_SUPPORT && ENV !== 'development') {
      this.swAndPushService.registerServiceWorker();
    }
    let pushSub$ = this.store.select(s => s.ui.pushNotification);
    pushSub$
      .filter(push => push !== null)
      .subscribe((push: PushNotification) => {
        this.swAndPushService.create(push)
          .subscribe(
          () => log('success'),
          (err) => log(err)
          );
      });
    let creditedOffer$ = this.store.let(getCreditedOfferCollection());
    creditedOffer$
      .filter(offers => offers.length > 0)
      .filter(offers => offers.find(offer => offer.viewed === undefined) !== undefined)
      .subscribe((offers) => {
        offers.forEach(offer => {
          if (!offer.viewed) {
            this.openCreditedDialog(offer);
            this.store.dispatch(this.uiActions.markCreditedOfferAsViewed(offer.id));
          }
        });
      });
  }

  activateEvent(event) {
    log('Activate Event:', event);
  }

  deactivateEvent(event) {
    log('Deactivate Event', event);
  }
  closeConnection() {
    this.closeConnection$.next();
  }
  connect() {
    this.webSocket$ = Observable.webSocket(`${PUBLISH ? 'wss' : 'ws'}://${HOST}:${PUBLISH ? '8443' : '8089'}/user/socket/connect`); // tslint:disable-line max-line-length
    this.webSocket$
      .retry()
      .takeUntil(this.closeConnection$)
      .subscribe(
      (res: { event?: string, id?: string, type?: string, payload?: any }) => {
        log(`connected: `, res);
        if (res.event === 'CONNECTION') {
          this.store.dispatch(this.uiActions.addUserIDToSocket(res.id));
        }
        if (res.type) {
          this.store.dispatch({ type: res.type, payload: res.payload });
        }
        if (Array.isArray(res)) {
          res.forEach((action: Action) => {
            this.store.dispatch({ type: action.type, payload: action.payload });
          });
        }
      },
      (err) => { log(err); this.connect(); },
      () => log('complete'));
  }

  logout() {
    this.closeConnection();
    this.store.dispatch(this.userActions.logout());
  }

  openCreditedDialog(offer: Offer) {
    this.dialogRef = this.dialog.open(CreditedOfferDialog, this.config);
    this.dialogRef.componentInstance.offer = offer;

    this.dialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        this.dialogRef = null;
      });
  }

  toggleMobile() {
    this.store.dispatch(this.uiActions.toggleSideNavOpen());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
