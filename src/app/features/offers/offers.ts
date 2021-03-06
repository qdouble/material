import { animate, style, transition, trigger } from '@angular/animations';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import * as offerActions from '../../actions/offer';
import * as userActions from '../../actions/user';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { Credit } from '../../models/credit';
import { Offer } from '../../models/offer';
import { User } from '../../models/user';
import * as fromStore from '../../reducers';
import { scrollToTop } from '../../utilities/scroll-to-top';

const firstBy = require('thenby');

@Component({
  selector: 'os-offers',
  templateUrl: './offers.html',
  styleUrls: ['./offers.scss'],
  providers: [UniqueSelectionDispatcher],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class Offers implements AfterViewInit, OnDestroy, OnInit {
  addUp: boolean;
  checkedOffers: { id: string; creditValue: number; checked: boolean }[] = [];
  checkedOffers$: Subject<{ id: string; creditValue: number; checked: boolean }[]> = new Subject<
    { id: string; creditValue: number; checked: boolean }[]
  >();
  confirmDialogRef: MatDialogRef<ConfirmDialog>;
  confirmDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>;
  creditTotal$: Observable<number>;
  creditedOfferIds: string[];
  destroyed$: Subject<any> = new Subject();
  flash: string;
  firstName$: Observable<string>;
  hideOffers: boolean;
  lastCloseResult: string;
  loaded$: Observable<boolean>;
  loaded: boolean;
  loadedUserOffers$: Observable<boolean>;
  loadedUserOffers: boolean;
  loggedIn$: Observable<boolean>;
  loggedIn: boolean;
  mobile$: Observable<boolean>;
  offerRankUpdatedAt$: Observable<string>;
  offers$: Observable<Offer[]>;
  offersSorted$: Observable<Offer[]>;
  offersUnsorted$: Observable<Offer[]>;
  offersCompleted$: Observable<Offer[]>;
  offersFeatured$: Observable<Offer[]>;
  offersNonFeatured$: Observable<Offer[]>;
  offersAvailable$: Observable<Offer[]>;
  offersAvailableSortBy$: Observable<Offer[]>;
  showCompleted: boolean;
  sideNavOpen$: Observable<boolean>;
  selectedOption = 'Available';
  sortBy = 'featured';
  sortBy$: Subject<any> = new BehaviorSubject('featured');
  returningUser$: Observable<boolean>;
  reverse = false;
  offersSelected = 0;
  offersSelectedCreditValue = 0;
  newEqualTrue$: Observable<boolean>;
  testShowRef$: Observable<number>;
  testShowRefLevel: number;
  timeRemaining: {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  userLevel: number;
  username$: Observable<string>;
  username: string;
  user$: Observable<User>;
  // Paging
  pages: number[] = [];
  selectedPage = 1;
  offersPerPage = 20;
  pageOffset$: Subject<any> = new Subject();
  //
  displayOptions = ['Available', 'Completed'];
  sortByLabels = ['Featured', 'Cost', 'Credit Value'];
  sortByValues = ['featured', 'costToUser', 'creditValue'];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromStore.getUserProfile));
    this.mobile$ = this.store.pipe(select(fromStore.getUIMobile));
    this.sideNavOpen$ = this.store.pipe(select(fromStore.getUISideNavOpen));
    this.loaded$ = this.store.pipe(select(fromStore.getOfferLoaded));
    this.loaded$.pipe(takeUntil(this.destroyed$)).subscribe(l => (this.loaded = l));
    this.loadedUserOffers$ = this.store.pipe(select(fromStore.getOfferLoadedUserOffers));
    this.loadedUserOffers$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(l => (this.loadedUserOffers = l));
    this.loggedIn$ = this.store.pipe(select(fromStore.getUserLoggedIn));
    this.loggedIn$.pipe(takeUntil(this.destroyed$)).subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (!this.loaded) {
        if (loggedIn) {
          this.store.dispatch(new offerActions.GetOffers());
        } else {
          this.store.dispatch(new offerActions.GetViewOffers());
          this.sortBy$.next('featured');
        }
      } else if (loggedIn && this.loaded && !this.loadedUserOffers) {
        this.store.dispatch(new offerActions.GetOffers());
      }
    });

    this.offersUnsorted$ = this.store.pipe(select(fromStore.getOfferCollection));
    this.offersUnsorted$
      .pipe(
        takeUntil(this.destroyed$),
        filter(o => o !== undefined)
      )
      .subscribe(offers => {
        this.pages = [];
        for (let i = 0; i < offers.length / this.offersPerPage; i++) {
          this.pages.push(i + 1);
        }
      });
    this.sortBy$.pipe(takeUntil(this.destroyed$)).subscribe((sortBy: string) => {
      if (sortBy === 'featured') {
        this.offersSorted$ = this.offersUnsorted$.pipe(
          map(arr =>
            arr.sort(
              firstBy(sortBy, { direction: -1 })
                .thenBy('order')
                .thenBy('name')
            )
          )
        );
      } else {
        this.offersSorted$ = this.offersUnsorted$.pipe(
          map(arr =>
            arr.sort(
              firstBy(sortBy, { direction: sortBy === 'costToUser' ? 1 : -1 })
                .thenBy('popularityRank', 1)
                .thenBy('popularityRank2', 1)
                .thenBy('featured', -1)
                .thenBy('order')
            )
          )
        );
      }

      this.offers$ = this.offersSorted$;
      let completed = (arr: Offer[], offerIds) => {
        return arr.filter(offer => offerIds.includes(offer.id));
      };
      this.credits$ = this.store.pipe(select(fromStore.getUserCreditCollection));
      this.credits$
        .pipe(
          takeUntil(this.destroyed$),
          filter(credits => credits !== undefined),
          filter(credits => credits.length > 0)
        )
        .subscribe(credits => {
          this.creditedOfferIds = credits.map(credit => credit.offerId);
          this.offersCompleted$ = combineLatest(
            this.offersSorted$,
            of(this.creditedOfferIds),
            completed
          );
        });
    });

    this.creditTotal$ = this.store.pipe(select(fromStore.getUserCreditTotal));
    this.creditTotal$.subscribe(total => {
      this.userLevel = Math.floor(Number(Number(total).toFixed(2)));
    });
    this.checkedOffers$.subscribe(offers => {
      let values = offers.map(o => o.creditValue);
      let selected = 0;
      let creditValue = 0;
      values.forEach(value => {
        selected += 1;
        creditValue += value;
      });
      this.offersSelected = selected;
      this.offersSelectedCreditValue = creditValue;
    });

    this.route.params.subscribe(param => {
      if (param['showRefT']) {
        this.store.dispatch(new userActions.TestShowRefRandom(JSON.parse(param['showRefT'])));
      }
      if (param['new']) {
        this.store.dispatch(new userActions.NewEqualTrue(true));
      }
      if (param['returning']) {
        this.store.dispatch(new userActions.ReturningUser());
      }
    });
    this.firstName$ = this.store.select(s => s.user.user.firstName);
    let lastUpdate$ = this.store.select(s => s.offer.lastUpdatedAt);
    let lastUpdate;
    lastUpdate$.pipe(takeUntil(this.destroyed$)).subscribe(l => {
      if (!lastUpdate) {
        lastUpdate = l;
      } else if (lastUpdate && lastUpdate !== l) {
        if (this.loggedIn) {
          this.store.dispatch(new offerActions.GetOffers());
        } else {
          this.store.dispatch(new offerActions.GetViewOffers());
        }
      }
    });
    this.offerRankUpdatedAt$ = this.store.pipe(select(fromStore.getOfferRankUpdatedAt));
    this.newEqualTrue$ = this.store.select(s => s.user.isNew);
    this.returningUser$ = this.store.select(s => s.user.returningUser);
    this.testShowRef$ = this.store.select(s => s.user.testShowRefRandom);
    this.username$ = this.store.select(s => s.user.user.username);
    this.username$.pipe(takeUntil(this.destroyed$)).subscribe(u => (this.username = u));
    this.store.dispatch(new offerActions.GetOffersUpdatedAt());

    this.user$
      .pipe(
        filter(user => user.createdAt !== undefined),
        takeUntil(this.destroyed$)
      )
      .subscribe(user => {
        if (user && user.holdReason === 'Identification Hold - Suspicious Activity') {
          this.hideOffers = true;
        }

        let createdAt = Date.parse(<any>user.createdAt);
        let deadline = new Date(createdAt + 24 * 60 * 60 * 1000);

        function getTimeRemaining(endTime) {
          let t = Date.parse(endTime) - Date.parse(<any>new Date());
          let seconds = Math.floor((t / 1000) % 60);
          let minutes = Math.floor((t / 1000 / 60) % 60);
          let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
          let days = Math.floor(t / (1000 * 60 * 60 * 24));
          return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };
        }

        let countdown = setInterval(() => {
          this.timeRemaining = getTimeRemaining(deadline);
          if (this.timeRemaining.hours < 0) clearInterval(countdown);
        }, 1000);
      });
  }

  ngAfterViewInit() {
    scrollToTop();
  }

  goToOfferDetails(offer: Offer) {
    if (offer.hideToUnQualifiedUsers && offer.qualificationLevel > this.userLevel) {
      return this.openConfirmDialog(
        `<b>You are currently on Level ${this.userLevel}.</b><br><br>
        This offer is restricted to users on level ${offer.qualificationLevel} and above.
        <em>You must get to level ${offer.qualificationLevel} in order to complete this offer.</em>`
      );
    }
    this.router.navigate(['offers', 'offer-details', { id: offer.id }]);
  }

  checkOffer(event: { id: string; creditValue: number; checked: boolean }) {
    if (event.checked) {
      this.checkedOffers = [...this.checkedOffers, event];
    } else {
      this.checkedOffers = this.checkedOffers.filter(offer => offer.id !== event.id);
    }
    this.checkedOffers$.next(this.checkedOffers);
  }

  changeSort(value: string | null) {
    this.sortBy$.next(value);
  }

  openConfirmDialog(message: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = message;
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogRef) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
