import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatButton,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatSidenav,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  MatToolbar
} from '@angular/material';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { interval, Observable, Subject, timer } from 'rxjs';
import { filter, retry, take, takeUntil } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { TransferState } from '../modules/transfer-state/transfer-state';
import * as notificationActions from './actions/notification';
import * as prizeActions from './actions/prize';
import * as uiActions from './actions/ui';
import * as userActions from './actions/user';
import { views } from './app-nav-views';
import { AskQuestionsDialog } from './dialogs/ask-questions.dialog';
import { CompletedOrderDialog } from './dialogs/completed-order.dialog';
import { CreditedOfferDialog } from './dialogs/credited-offer.dialog';
import { LevelBadgeDialog } from './dialogs/level-badge.dialog';
import { Credit } from './models/credit';
import { Notification } from './models/notification';
import { Notify } from './models/notify';
import { Offer } from './models/offer';
import { Order } from './models/order';
import { PushNotification } from './models/push-notification';
import { GetIPInfoResponse, Script, SocialProof, SocialProofSettings } from './models/ui';
import * as fromStore from './reducers';
import { ScriptService } from './script.service';
import { log, MOBILE, SERVICE_WORKER_SUPPORT } from './services/constants';
import { SWAndPushService } from './services/sw-and-push';
import { ProofSnackbarComponent } from './snackbars/proof.snackbar.component';
import { scrollToTop } from './utilities/scroll-to-top';
import { validateUserName } from './validators';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeStartEnd', [
      state(
        'start',
        style({
          opacity: 0
        })
      ),
      state(
        'end',
        style({
          opacity: 1
        })
      ),
      transition('start => end', [
        animate(
          `300ms`,
          keyframes([style({ opacity: 0, offset: 0 }), style({ opacity: 1, offset: 1.0 })])
        )
      ]),
      transition('end => start', [
        animate(
          `1s`,
          keyframes([style({ opacity: 1, offset: 0 }), style({ opacity: 0, offset: 1.0 })])
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('menuButton') menuButton: MatButton;
  @ViewChild('toolbar') toolbar: MatToolbar;
  // Nav menu related //
  initView = true;
  mobile = MOBILE;
  previousView;
  sideNavMode = this.mobile ? 'over' : 'side';
  sideNavOpen = false;
  sideNavPosition = 'start';
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
  checkVersionInterval$: Observable<number>;
  completedOrders$: Observable<Order[]>;
  creditedOffer$: Observable<Offer[]>;
  credits$: Observable<Credit[]>;
  creditTotal: number;
  creditTotal$: Observable<number>;
  destroyProofTimer$: Subject<any> = new Subject<any>();
  firstName: string;
  HMR = HMR;
  invalidCountry$: Observable<boolean>;
  ipInfo: GetIPInfoResponse;
  ipInfo$: Observable<GetIPInfoResponse>;
  latestVersion$: Observable<string>;
  loaded: boolean;
  loggedIn: boolean;
  loginChecked: boolean;
  navigationPhase: 'start' | 'end' = 'start';
  notifications$: Observable<Notification[]>;
  notify$: Observable<Notify[]>;
  onAdminLoginPage: boolean;
  onAdminLoginPage$: Observable<boolean>;
  openLevelAfterClose = 0;
  proofCount = 0;
  proofDismissedWithAction: boolean;
  proofs: SocialProof[];
  proofSnackBar: MatSnackBarRef<ProofSnackbarComponent>;
  pushNotifications$: Observable<PushNotification>;
  referredBy: string;
  scripts$: Observable<Script[]>;
  scriptsRequested: boolean;
  showFooter: boolean;
  showLevelBadge$: Observable<number>;
  showNotifications = false;
  showStatus: boolean;
  snackRefs = [];
  socialProofs$: Observable<SocialProof[]>;
  socialProofSettings: SocialProofSettings;
  socialProofSettings$: Observable<SocialProofSettings>;
  socialProofStopRepeat: boolean;
  unreadMessageTotal$: Observable<number>;
  unreadNotificationPendingTotal$: Observable<number>;
  unreadNotificationTotal$: Observable<number>;
  updatedAt: string;
  userActive$: Observable<boolean>;
  userFirstName$: Observable<string>;
  userId = '';
  userLastUpdate$: Observable<string>;
  userLoaded$: Observable<boolean>;
  userLoading$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  userLoginChecked$: Observable<boolean>;
  userReferredBy$: Observable<string | null>;
  userReferrerBlocked$: Observable<boolean>;
  userUpdatedAt$: Observable<string>;
  version: string;
  version$: Observable<string>;
  views = views;
  constructor(
    private cache: TransferState,
    private route: ActivatedRoute,
    private router: Router,
    private script: ScriptService,
    private store: Store<fromStore.AppState>,
    private swAndPushService: SWAndPushService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.version$ = this.store.pipe(select(fromStore.getUIVersion));
    this.latestVersion$ = this.store.pipe(select(fromStore.getUILatestVersion));
    this.userLoginChecked$ = this.store.pipe(select(fromStore.getUserLoginChecked));
    this.userLoggedIn$ = this.store.pipe(select(fromStore.getUserLoggedIn));
    this.userLoaded$ = this.store.pipe(select(fromStore.getUserLoaded));
    this.userLoading$ = this.store.pipe(select(fromStore.getUserLoading));
    this.userActive$ = this.store.pipe(select(s => s.user.user.active));
    this.userUpdatedAt$ = this.store.pipe(select(s => s.user.updatedAt));
    this.userLastUpdate$ = this.store.pipe(select(s => s.user.lastUpdate));
    this.userFirstName$ = this.store.pipe(select(s => s.user.user.firstName));
    this.pushNotifications$ = this.store.pipe(select(s => s.ui.pushNotification));
    this.ipInfo$ = this.store.pipe(select(fromStore.getUIIPInfo));
    this.invalidCountry$ = this.store.pipe(select(fromStore.getUIInvalidCountry));
    this.onAdminLoginPage$ = this.store.pipe(select(fromStore.getUserOnAdminPage));
    this.notify$ = this.store.pipe(select(fromStore.getNotifyCollection));
    this.userReferredBy$ = this.store.pipe(select(fromStore.getUserReferredBy));
    this.credits$ = this.store.pipe(select(fromStore.getUserCreditCollection));
    this.userReferrerBlocked$ = this.store.pipe(select(fromStore.getUserReferrerBlocked));
    this.amountPaid$ = this.store.pipe(select(fromStore.getUserAmountPaid));
    this.askQuestions$ = this.store.pipe(select(fromStore.getUserAskQuestions));
    this.creditTotal$ = this.store.pipe(select(fromStore.getUserCreditTotal));
    this.notifications$ = this.store.pipe(select(fromStore.getNotificationCollection));
    this.unreadNotificationPendingTotal$ = this.store.pipe(
      select(fromStore.getNotificationPending)
    );
    this.unreadNotificationTotal$ = this.store.pipe(select(fromStore.getNotificationUnreadTotal));
    this.showLevelBadge$ = this.store.pipe(select(fromStore.getUserShowLevelBadgeNum));
    this.scripts$ = this.store.pipe(select(fromStore.getUIScripts));
    this.completedOrders$ = this.store.pipe(select(fromStore.getUICompletedOrdersCollection));
    this.creditedOffer$ = this.store.pipe(select(fromStore.getUICreditedOfferCollection));
    this.socialProofs$ = this.store.pipe(select(fromStore.getUISocialProofCollection));
    this.socialProofSettings$ = this.store.pipe(select(fromStore.getUISocialProofSettings));
    this.checkVersionInterval$ = interval(600000);
  }

  ngOnInit() {
    this.initDispatches();
    this.cache.set('cached', true);
    if (SERVICE_WORKER_SUPPORT) {
      this.swAndPushService.unregisterServiceWorkers(['service-worker.js']);
      this.swAndPushService.registerServiceWorkers(['sw-push.js']);
    }

    this.version$.subscribe(v => (this.version = v));

    this.latestVersion$.pipe(filter(v => v !== null)).subscribe(latestVersion => {
      if (latestVersion !== this.version) {
        log(`${latestVersion} <-> ${this.version}`);
        window.location.reload();
      }
    });

    this.checkVersionInterval$.subscribe(() => {
      this.store.dispatch(new uiActions.GetVersion());
    });

    this.userLoggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn && !this.loaded) {
        this.store.dispatch(new userActions.GetProfile());
        this.connect();
      }
      if (loggedIn !== null && !this.scriptsRequested) {
        this.store.dispatch(new uiActions.GetScriptsToLoad());
        this.scriptsRequested = true;
      }
      if (
        loggedIn === false &&
        !this.onAdminLoginPage &&
        !this.proofDismissedWithAction &&
        !this.socialProofStopRepeat
      ) {
        this.proofCount = 0;
      } else if (loggedIn && this.proofSnackBar) {
        this.proofSnackBar.dismiss();
        this.proofSnackBar = undefined;
      }
      if (
        (loggedIn !== null && !this.socialProofSettings) ||
        (loggedIn && this.socialProofSettings) ||
        (!loggedIn && this.socialProofSettings)
      ) {
        setTimeout(() => {
          this.store.dispatch(new uiActions.GetSocialProofSettings());
        });
      }
    });

    this.userLoginChecked$.subscribe(checked => {
      if (checked === false && this.loggedIn === false) {
        this.initDispatches();
      }
    });

    this.userLoaded$.subscribe(loaded => {
      this.loaded = loaded;
      if (loaded && SERVICE_WORKER_SUPPORT) {
        this.swAndPushService.requestPermission();
      }
    });

    this.userActive$.pipe(filter(active => active === false)).subscribe(() => {
      this.store.dispatch(new userActions.Logout());
    });

    this.userUpdatedAt$.subscribe(updatedAt => {
      this.updatedAt = updatedAt;
    });

    this.userLastUpdate$.pipe(filter(l => l !== null && l !== undefined)).subscribe(lastUpdate => {
      if (this.updatedAt && lastUpdate !== this.updatedAt) {
        this.store.dispatch(new userActions.GetProfile());
      }
    });

    this.ipInfo$.subscribe(i => (this.ipInfo = i));

    this.invalidCountry$.pipe(filter(i => i === true)).subscribe(i => {
      this.store.dispatch(new uiActions.AddInvalidCountry(this.ipInfo));
      const override = this.store.pipe(select(fromStore.getUIOverrideInvalidIp));
      override.pipe(filter(o => typeof o === 'string')).subscribe(o => {
        setTimeout(() => {
          this.store.dispatch(new uiActions.OverrideInvalidCountry(o));
        });
      });
    });

    this.notify$.pipe(filter(notify => notify.length > 0)).subscribe(notify => {
      if (notify && notify[0] && notify[0].message === 'Unexpected token U in JSON at position 0') {
        return;
      }
      let config = new MatSnackBarConfig();
      let index = notify.length - 1;
      this.snackRefs[index] = this.snackBar.open(
        notify[index].message,
        this.action && this.actionButtonLabel,
        config
      );
      setTimeout(() => {
        this.snackRefs[index].dismiss();
      }, 5000);
    });

    this.route.queryParams
      .pipe(
        filter(param => param !== undefined),
        filter(param => param['ref'] !== undefined),
        take(1)
      )
      .subscribe(param => {
        this.referredBy = param['ref'];
        if (validateUserName(this.referredBy)) {
          this.store.dispatch(new userActions.SetReferredBy(this.referredBy));
          this.store.dispatch(new userActions.CheckReferrerUsername(this.referredBy));
        }
      });

    this.onAdminLoginPage$.pipe(filter(on => on === true)).subscribe(() => {
      setTimeout(() => {
        this.onAdminLoginPage = true;
      });
    });

    this.credits$.subscribe(credits => {
      this.creditTotal = 0;
      credits.forEach(credit => {
        if (credit.active && !credit.unconfirmed) {
          this.creditTotal += credit.creditValue;
        }
      });
      this.creditTotal = Number(Number(this.creditTotal).toFixed(2));
      this.store.dispatch(new userActions.SetCreditTotal(this.creditTotal));
    });

    this.userReferrerBlocked$.subscribe(blocked => {
      if (blocked) {
        this.router.navigate(['referrer-blocked']);
        this.mobile = true;
      }
    });

    this.askQuestions$.subscribe(ask => {
      if (ask) {
        setTimeout(() => {
          this.openAskQuestionsDialog();
        }, 1);
      }
    });

    this.userFirstName$.subscribe(n => (this.firstName = n));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navigationPhase = 'start';
        scrollToTop();
      }
      if (event instanceof NavigationEnd) {
        this.navigationPhase = 'end';
        log('ROUTER EVENTS', event.url);
        if (event.url) {
          this.showStatus = event.url.startsWith('/offers');
        }
        this.showNotifications = false;
      }
    });

    this.pushNotifications$
      .pipe(filter(push => push !== null))
      .subscribe((push: PushNotification) => {
        this.swAndPushService.create(push).subscribe(() => log('success'), err => log(err));
      });

    this.completedOrders$.subscribe(orders => {
      orders.forEach(order => {
        if (!order.viewed) {
          this.openCompletedOrderDialog(order);
          this.store.dispatch(new uiActions.MarkCompletedOrderAsViewed(order.id));
        }
      });
    });

    this.creditedOffer$
      .pipe(
        filter(offers => offers.length > 0),
        filter(offers => offers.find(offer => offer.viewed === undefined) !== undefined)
      )
      .subscribe(offers => {
        offers.forEach(offer => {
          if (!offer.viewed) {
            this.openCreditedDialog(offer);
            this.store.dispatch(new uiActions.MarkCreditedOfferAsViewed(offer.id));
          }
        });
      });

    this.showLevelBadge$.pipe(filter(l => l !== undefined && l !== null)).subscribe(level => {
      this.openLevelBadgeDialog(level);
    });

    this.scripts$
      .pipe(filter(s => s && s.length > 0))
      .subscribe(scripts => this.loadScripts(scripts));

    if (this.version === '0.10.0') {
      this.socialProofSettings$
        .pipe(filter(s => s !== undefined && s !== null))
        .subscribe(settings => {
          this.socialProofSettings = settings;
          if (settings.active) {
            this.proofCount = 0;
            this.destroyProofTimer$.next();
            if (this.loggedIn) {
              setTimeout(() => {
                this.store.dispatch(new uiActions.GetSocialProof('level'));
              }, 2000);
            } else {
              this.store.dispatch(new uiActions.GetSocialProof('join'));
            }
          }
        });
      this.socialProofs$.pipe(filter(p => p.length >= 1)).subscribe(proofs => {
        this.proofs = proofs;
        this.openProofSnackBar(this.loggedIn);
      });
    }
    setTimeout(() => {
      this.showFooter = true;
    }, 20000);
  }

  initDispatches() {
    this.store.dispatch(new uiActions.GetIPInfo(''));
    this.store.dispatch(new prizeActions.GetPrizes());
    this.store.dispatch(new userActions.CheckLoggedIn());
    this.store.dispatch(new uiActions.SetMobile(MOBILE));
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

  closeSideNav() {
    this.sidenav.close();
    this.menuButton._elementRef.nativeElement.classList.remove('cdk-program-focused');
  }
  connect() {
    this.webSocket$ = webSocket(
      `${PUBLISH ? 'wss' : 'ws'}://${HOST}:${PUBLISH ? '8443' : '8089'}/user/socket/connect`
    ); // tslint:disable-line max-line-length
    this.webSocket$
      .pipe(
        retry(),
        takeUntil(this.closeConnection$)
      )
      .subscribe(
        (res: { event?: string; id?: string; type?: string; payload?: any }) => {
          log(`connected: `, res);
          if (res.event === 'CONNECTION') {
            this.store.dispatch(new uiActions.AddUserIDToSocket(res.id));
          }
          if (res.type) {
            this.store.dispatch({ type: res.type, payload: res.payload });
          }
          if (Array.isArray(res)) {
            res.forEach(action => {
              this.store.dispatch({ type: action.type, payload: action.payload });
            });
          }
        },
        err => {
          log(err);
          this.connect();
        },
        () => log('complete')
      );
  }

  loadScripts(scripts: Script[]) {
    scripts = scripts.filter(
      s => s.loadOn === (this.loggedIn ? 'loggedIn' : 'loggedOut') || s.loadOn === 'both'
    );
    if (!scripts.length) {
      if (ENV === 'development') {
        console.log('All Scripts were filtered out');
      }
      return;
    }
    this.script
      .load(scripts)
      .then(data => {
        if (ENV === 'development') {
          console.log('script loaded ', data);
        }
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.closeConnection();
    this.store.dispatch(new userActions.Logout());
  }

  markAllNotificationsAsRead() {
    this.store.dispatch(new notificationActions.MarkAllAsRead());
  }

  openAskQuestionsDialog() {
    this.askQuestionsDialogRef = this.dialog.open(
      AskQuestionsDialog,
      this.askQuestionsDialogConfig
    );
    this.askQuestionsDialogRef.componentInstance.firstName = this.firstName;

    if (this.askQuestionsDialogRef) {
      this.askQuestionsDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/support', { askQ: true }]);
        }
        this.askQuestionsDialogRef = null;
      });
    }
  }

  openProofSnackBar(showLoggedIn = false) {
    if (this.proofDismissedWithAction) return;
    let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    if (this.proofSnackBar) {
      this.proofSnackBar.dismiss();
      this.proofSnackBar = undefined;
    }
    if (this.loggedIn === showLoggedIn && this.proofs[this.proofCount]) {
      this.proofSnackBar = this.snackBar.openFromComponent(ProofSnackbarComponent, {
        data: this.proofs[this.proofCount],
        duration: this.socialProofSettings.duration,
        panelClass: 'os-proof-snackbar',
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition
      });
      if (this.proofCount < this.proofs.length - 1) {
        this.proofCount++;
      } else {
        if (this.socialProofSettings.repeat) {
          this.proofCount = 0;
        } else {
          this.socialProofStopRepeat = true;
        }
      }
    }
    if (this.proofSnackBar && !this.socialProofStopRepeat) {
      this.proofSnackBar
        .afterDismissed()
        .pipe(takeUntil(this.destroyProofTimer$))
        .subscribe(d => {
          if (d.dismissedByAction) {
            this.proofDismissedWithAction = true;
          } else {
            timer(this.socialProofSettings.delay)
              .pipe(takeUntil(this.destroyProofTimer$))
              .subscribe(() => {
                this.openProofSnackBar(this.loggedIn);
              });
          }
        });
    }
  }

  openCompletedOrderDialog(order: Order) {
    this.completedOrderDialogRef = this.dialog.open(
      CompletedOrderDialog,
      this.completedOrderDialogConfig
    );
    this.completedOrderDialogRef.componentInstance.order = order;

    if (this.completedOrderDialogRef) {
      this.completedOrderDialogRef.afterClosed().subscribe(() => {
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
      this.creditDialogRef.afterClosed().subscribe(() => {
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
      return (this.openLevelAfterClose = level);
    }
    if (level === undefined || level === null) return;
    this.levelBadgeDialogRef = this.dialog.open(LevelBadgeDialog, this.levelBadgeDialogConfig);
    this.levelBadgeDialogRef.componentInstance.level = ('0' + String(level)).slice(-2);
    if (this.creditDialogRef) {
      this.creditDialogRef.afterClosed().subscribe(() => {
        // this.creditDialogRef = null;
      });
    }
  }

  toggleMobile() {
    this.store.dispatch(new uiActions.ToggleSideNavOpen());
  }
}
