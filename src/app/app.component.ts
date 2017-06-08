import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  MdDialog, MdDialogRef, MdDialogConfig,
  MdSnackBar, MdSnackBarConfig
} from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { TransferState } from '../modules/transfer-state/transfer-state';

import { AppState } from './reducers';
import { Credit } from './models/credit';
import { Notification } from './models/notification';
import { Notify } from './models/notify';
import { NotificationActions } from './actions/notification';
import { PrizeActions } from './actions/prize';
import { UIActions } from './actions/ui';
import { UserActions } from './actions/user';
import {
  getNotificationCollection,
  getNoficationPendingTotal,
  getNotificationUnreadTotal
} from './reducers/notification';
import {
  getCompletedOrderCollection,
  getCreditedOfferCollection,
  getUILatestVersion,
  getUIVersion
} from './reducers/ui';

import {
  getUserOnAdminPage, getUserLoaded, getUserLoading, getUserLoggedIn, getUserReferredBy
} from './reducers/user';
import { getCreditCollection } from './reducers/user';
import { getNotifyCollection } from './reducers/notify';

import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { log, MOBILE, SERVICE_WORKER_SUPPORT } from './services/constants';
import { PushNotification } from './models/push-notification';
import { SWAndPushService } from './services/sw-and-push';

import { CompletedOrderDialog } from './dialogs/completed-order.dialog';
import { CreditedOfferDialog } from './dialogs/credited-offer.dialog';
import { Offer } from './models/offer';
import { Order } from './models/order';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
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
  completedOrderDialogRef: MdDialogRef<CompletedOrderDialog>;
  completedOrderDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  creditDialogRef: MdDialogRef<CreditedOfferDialog>;
  creditDialogConfig: MdDialogConfig = {
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
  notifications$: Observable<Notification[]>;
  notifiy$: Observable<Notify[]>;
  referredBy: string;
  showNotifications = false;
  snackRefs = [];
  unreadMessageTotal$: Observable<number>;
  unreadNotificatonPendingTotal$: Observable<number>;
  unreadNotificationTotal$: Observable<number>;
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
    private cache: TransferState,
    private cdr: ChangeDetectorRef,
    public dialog: MdDialog,
    private notificationActions: NotificationActions,
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
    let checkServer$ = Observable.interval(120000);
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
    this.notifiy$ = store.let(getNotifyCollection());
    this.notifiy$
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
        creditTotal = Math.ceil(creditTotal * 100) / 100;
        this.store.dispatch(this.userActions.setCreditTotal(creditTotal));
      });
    this.store.dispatch(this.prizeActions.getPrizes());
    this.store.dispatch(this.userActions.checkLoggedIn());
  }

  ngOnInit() {
    this.cache.set('cached', true);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showNotifications = false;
      }
    });
    this.store.dispatch(this.uiActions.setMobile(MOBILE));
    this.notifications$ = this.store.let(getNotificationCollection());
    this.unreadNotificatonPendingTotal$ = this.store.let(getNoficationPendingTotal());
    this.unreadNotificationTotal$ = this.store.let(getNotificationUnreadTotal());
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

    let completedOrders$ = this.store.let(getCompletedOrderCollection());
    completedOrders$
      // .filter(orders => orders.length > 0)
      // .filter(orders => orders.find(order => order.viewed === undefined) !== undefined)
      .subscribe(orders => {
        orders.forEach(order => {
          if (!order.viewed) {
            this.openCompletedOrderDialog(order);
            this.store.dispatch(this.uiActions.markCompletedOrderAsViewed(order.id));
          }
        });
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

  sayBlur() {
    log('BLUR!');
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

  markAllNotificationsAsRead() {
    this.store.dispatch(this.notificationActions.markAllAsRead());
  }

  openCompletedOrderDialog(order: Order) {
    this.completedOrderDialogRef = this.dialog.open(CompletedOrderDialog,
      this.completedOrderDialogRef);
    this.completedOrderDialogRef.componentInstance.order = order;

    this.completedOrderDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        this.completedOrderDialogRef = null;
      });
  }
  openCreditedDialog(offer: Offer) {
    this.creditDialogRef = this.dialog.open(CreditedOfferDialog, this.creditDialogConfig);
    this.creditDialogRef.componentInstance.offer = offer;

    this.creditDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        this.creditDialogRef = null;
      });
  }

  toggleMobile() {
    this.store.dispatch(this.uiActions.toggleSideNavOpen());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
