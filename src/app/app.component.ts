import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  MatDialog, MatDialogRef, MatDialogConfig,
  MatSnackBar, MatSnackBarConfig
} from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store, select } from '@ngrx/store';

import { TransferState } from '../modules/transfer-state/transfer-state';

import * as fromStore from './reducers';
import { Credit } from './models/credit';
import { Notification } from './models/notification';
import { Notify } from './models/notify';
import * as notificationActions from './actions/notification';
import * as prizeActions from './actions/prize';
import * as uiActions from './actions/ui';
import * as userActions from './actions/user';

import { validateUserName } from './validators';

import { views } from './app-nav-views';
import { log, MOBILE, SERVICE_WORKER_SUPPORT } from './services/constants';
import { PushNotification } from './models/push-notification';
import { SWAndPushService } from './services/sw-and-push';

import { AskQuestionsDialog } from './dialogs/ask-questions.dialog';
import { CompletedOrderDialog } from './dialogs/completed-order.dialog';
import { CreditedOfferDialog } from './dialogs/credited-offer.dialog';
import { LevelBadgeDialog } from './dialogs/level-badge.dialog';
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
  askQuestionsDialogRef: MatDialogRef<AskQuestionsDialog>;
  askQuestionsDialogConfig: MatDialogConfig = { disableClose: true };
  completedOrderDialogRef: MatDialogRef<CompletedOrderDialog>;
  completedOrderDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  creditDialogRef: MatDialogRef<CreditedOfferDialog>;
  creditDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  levelBadgeDialogRef: MatDialogRef<LevelBadgeDialog>;
  levelBadgeDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  /////////////
  amountPaid$: Observable<number>;
  askQuestions$: Observable<boolean>;
  destroyed$: Subject<any> = new Subject<any>();
  credits$: Observable<Credit[]>;
  creditTotal: number;
  creditTotal$: Observable<number>;
  firstName: string;
  onAdminLoginPage$: Observable<boolean>;
  HMR = HMR;
  latestVersion$: Observable<string>;
  loaded: boolean;
  loggedIn: boolean;
  notifications$: Observable<Notification[]>;
  notifiy$: Observable<Notify[]>;
  openLevelAfterClose = 0;
  referredBy: string;
  showNotifications = false;
  showStatus: boolean;
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
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private swAndPushService: SWAndPushService,
    public snackBar: MatSnackBar,
    private store: Store<fromStore.AppState>
  ) {
    let active$ = store.select(s => s.user.user.active);
    active$.takeUntil(this.destroyed$)
      .filter(active => active === false)
      .subscribe(active => {
        this.store.dispatch(new userActions.Logout());
      });
    this.version$ = store.pipe(select(fromStore.getUIVersion));
    this.version$.subscribe(v => this.version = v);
    this.latestVersion$ = store.pipe(select(fromStore.getUILatestVersion));
    this.latestVersion$
      .filter(v => v !== null)
      .takeUntil(this.destroyed$)
      .subscribe(latestVersion => {
        if (latestVersion !== this.version) {
          log(`${latestVersion} <-> ${this.version}`);
          window.location.reload();
        }
      });
    let checkServer$ = Observable.interval(600000);
    checkServer$
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.store.dispatch(new uiActions.GetVersion());
        if (this.loggedIn) {
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
          store.dispatch(new userActions.GetProfile());
        }
      });
    this.onAdminLoginPage$ = store.pipe(select(fromStore.getUserOnAdminPage));
    this.notifiy$ = store.pipe(select(fromStore.getNotifyCollection));
    this.notifiy$
      .takeUntil(this.destroyed$)
      .filter(notify => notify.length > 0)
      .subscribe(notify => {
        if (notify && notify[0] &&
          notify[0].message === 'Unexpected token U in JSON at position 0') {
          return;
        }
        let config = new MatSnackBarConfig();
        let index = notify.length - 1;
        this.snackRefs[index] = this.snackBar.open(notify[index].message,
          this.action && this.actionButtonLabel, config);
        setTimeout(() => { this.snackRefs[index].dismiss(); }, 5000);
      });
    this.userLoaded$ = store.pipe(select(fromStore.getUserLoaded));

    this.userLoading$ = store.pipe(select(fromStore.getUserLoading));
    this.userLoggedIn$ = store.pipe(select(fromStore.getUserLoggedIn));
    this.userLoggedIn$
      .takeUntil(this.destroyed$)
      .subscribe(l => this.loggedIn = l);
    this.userReferredBy$ = store.pipe(select(fromStore.getUserReferredBy));
    this.route.queryParams
      .filter(param => param['ref'] !== undefined)
      .take(1)
      .subscribe(param => {
        this.referredBy = param['ref'];
        if (validateUserName(this.referredBy)) {
          this.store.dispatch(new userActions.SetReferredBy(this.referredBy));
          this.store.dispatch(new userActions.CheckReferrerUsername(this.referredBy));
        }
      });
    this.credits$ = store.pipe(select(fromStore.getUserCreditCollection));
    this.credits$
      .takeUntil(this.destroyed$)
      .subscribe(credits => {
        this.creditTotal = 0;
        credits.forEach(credit => {
          if (credit.active && !credit.unconfirmed) {
            this.creditTotal += credit.creditValue;
          }
        });
        this.creditTotal = Number(Number(this.creditTotal).toFixed(2));
        this.store.dispatch(new userActions.SetCreditTotal(this.creditTotal));
      });
    this.store.dispatch(new prizeActions.GetPrizes());
    this.store.dispatch(new userActions.CheckLoggedIn());
  }

  ngOnInit() {
    this.store.pipe(select(fromStore.getUserReferrerBlocked))
      .subscribe(blocked => {
        if (blocked) {
          this.router.navigate(['referrer-blocked']);
          this.mobile = true;
        }
      });
    this.amountPaid$ = this.store.pipe(select(fromStore.getUserAmountPaid));
    this.askQuestions$ = this.store.pipe(select(fromStore.getUserAskQuestions));
    this.askQuestions$.subscribe(ask => {
      if (ask) {
        setTimeout(() => {
          this.openAskQuestionsDialog();
        }, 1);
      }
    });
    this.cache.set('cached', true);
    this.creditTotal$ = this.store.pipe(select(fromStore.getUserCreditTotal));
    let firstName = this.store.select(s => s.user.user.firstName);
    firstName.takeUntil(this.destroyed$).subscribe(n => this.firstName = n);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        log('ROUTER EVENTS', val.url);
        this.showStatus = val.url.startsWith('/offers');
        this.showNotifications = false;
      }
    });
    this.store.dispatch(new uiActions.SetMobile(MOBILE));
    this.notifications$ = this.store.pipe(select(fromStore.getNotificationCollection));
    this.unreadNotificatonPendingTotal$ = this.store.pipe(select(fromStore.getNotificationPending));
    this.unreadNotificationTotal$ = this.store.pipe(select(fromStore.getNotificationUnreadTotal));
    this.userLoaded$.subscribe(loaded => {
      this.loaded = loaded;
      if (loaded && SERVICE_WORKER_SUPPORT) {
        this.swAndPushService.requestPermission();
      }
    });
    this.userLoggedIn$.subscribe(loggedIn => {
      if (loggedIn && !this.loaded) {
        this.store.dispatch(new userActions.GetProfile());
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

    let completedOrders$ = this.store.pipe(select(fromStore.getUICompletedOrdersCollection));
    completedOrders$
      .subscribe(orders => {
        orders.forEach(order => {
          if (!order.viewed) {
            this.openCompletedOrderDialog(order);
            this.store.dispatch(new uiActions.MarkCompletedOrderAsViewed(order.id));
          }
        });
      });
    let creditedOffer$ = this.store.pipe(select(fromStore.getUICreditedOfferCollection));
    creditedOffer$
      .filter(offers => offers.length > 0)
      .filter(offers => offers.find(offer => offer.viewed === undefined) !== undefined)
      .subscribe((offers) => {
        offers.forEach(offer => {
          if (!offer.viewed) {
            this.openCreditedDialog(offer);
            this.store.dispatch(new uiActions.MarkCreditedOfferAsViewed(offer.id));
          }
        });
      });
    let showLevelBadge = this.store.pipe(select(fromStore.getUserShowLevelBadgeNum));
    showLevelBadge.filter(l => l !== undefined && l !== null)
      .subscribe((level) => {
        this.openLevelBadgeDialog(level);
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
          this.store.dispatch(new uiActions.AddUserIDToSocket(res.id));
        }
        if (res.type) {
          this.store.dispatch({ type: res.type, payload: res.payload });
        }
        if (Array.isArray(res)) {
          res.forEach((action) => {
            this.store.dispatch({ type: action.type, payload: action.payload });
          });
        }
      },
      (err) => { log(err); this.connect(); },
      () => log('complete'));
  }

  logout() {
    this.closeConnection();
    this.store.dispatch(new userActions.Logout());
  }

  markAllNotificationsAsRead() {
    this.store.dispatch(new notificationActions.MarkAllAsRead());
  }

  openAskQuestionsDialog() {
    this.askQuestionsDialogRef = this.dialog.open(AskQuestionsDialog,
      this.askQuestionsDialogConfig);
    this.askQuestionsDialogRef.componentInstance.firstName = this.firstName;

    if (this.askQuestionsDialogRef) {
      this.askQuestionsDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/support', { askQ: true }]);
          }
          this.askQuestionsDialogRef = null;
        });
    }
  }

  openCompletedOrderDialog(order: Order) {
    this.completedOrderDialogRef = this.dialog.open(CompletedOrderDialog,
      this.completedOrderDialogConfig);
    this.completedOrderDialogRef.componentInstance.order = order;

    if (this.completedOrderDialogRef) {
      this.completedOrderDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          this.completedOrderDialogRef = null;
        });
    }
  }
  openCreditedDialog(offer: Offer) {
    if (offer.displayName === 'Bonus Credit') return;
    this.creditDialogRef = this.dialog.open(CreditedOfferDialog, this.creditDialogConfig);
    this.creditDialogRef.componentInstance.creditsTotal = this.creditTotal;
    this.creditDialogRef.componentInstance.offer = offer;
    if (this.creditDialogRef) {
      this.creditDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          if (this.openLevelAfterClose) {
            this.openLevelBadgeDialog(this.openLevelAfterClose);
            this.openLevelAfterClose = 0;
          }
          this.creditDialogRef = null;
        });
    }
  }

  openLevelBadgeDialog(level: number) {
    if (this.dialog.openDialogs.length) {
      return this.openLevelAfterClose = level;
    }
    if (level === undefined || level === null) return;
    this.levelBadgeDialogRef = this.dialog.open(LevelBadgeDialog, this.levelBadgeDialogConfig);
    this.levelBadgeDialogRef.componentInstance.level = ('0' + String(level)).slice(-2);
    if (this.creditDialogRef) {
      this.creditDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          // this.creditDialogRef = null;
        });
    }
  }

  toggleMobile() {
    this.store.dispatch(new uiActions.ToggleSideNavOpen());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
