import {
  AfterViewInit, Component, ChangeDetectionStrategy,
  OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UniqueSelectionDispatcher } from '@angular/material';

const firstBy = require('thenby');

import { AppState } from '../../reducers';
import { Credit } from '../../models/credit';
import { Offer } from '../../models/offer';
import {
  getOfferCollection,
  getOfferLoaded,
  getOfferLoadedUserOffers,
  getOfferRankUpdatedAt
} from '../../reducers/offer';
import { getUIMobile, getUISideNavOpen } from '../../reducers/ui';
import { getCreditCollection, getUserLoggedIn, getCreditTotal } from '../../reducers/user';
import { OfferActions } from '../../actions/offer';

import { ConfirmDialog } from '../../dialogs/confirm.dialog';

@Component({
  selector: 'os-offers',
  templateUrl: './offers.html',
  styleUrls: ['./offers.scss'],
  providers: [UniqueSelectionDispatcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})

export class Offers implements AfterViewInit, OnDestroy, OnInit {
  addUp: boolean;
  checkedOffers: { id: string, creditValue: number, checked: boolean }[] = [];
  checkedOffers$: Subject<{ id: string, creditValue: number, checked: boolean }[]>
  = new Subject<{ id: string, creditValue: number, checked: boolean }[]>();
  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>;
  creditTotal$: Observable<number>;
  creditedOfferIds: string[];
  destroyed$: Subject<any> = new Subject();
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
  reverse = false;
  offersSelected = 0;
  offersSelectedCreditValue = 0;
  userLevel: number;
  // Paging
  pages: number[] = [];
  selectedPage = 1;
  offersPerPage = 20;
  pageOffset$: Subject<any> = new Subject();
  //
  displayOptions = [
    'Available',
    'Completed'
  ];
  sortByLabels = [
    'Featured',
    'Cost',
    'Credit Value'
  ];
  sortByValues = [
    'featured',
    'costToUser',
    'creditValue'
  ];
  constructor(
    public dialog: MdDialog,
    private offerActions: OfferActions,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.mobile$ = this.store.let(getUIMobile());
    this.sideNavOpen$ = this.store.let(getUISideNavOpen());
    this.loaded$ = this.store.let(getOfferLoaded());
    this.loaded$
      .takeUntil(this.destroyed$)
      .subscribe(l => this.loaded = l);
    this.loadedUserOffers$ = this.store.let(getOfferLoadedUserOffers());
    this.loadedUserOffers$
      .takeUntil(this.destroyed$)
      .subscribe(l => this.loadedUserOffers = l);
    this.loggedIn$ = this.store.let(getUserLoggedIn());
    this.loggedIn$
      .takeUntil(this.destroyed$)
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn;
        if (!this.loaded) {
          if (loggedIn) {
            this.store.dispatch(this.offerActions.getOffers());
          } else {
            this.store.dispatch(this.offerActions.getViewOffers());
            this.sortBy$.next('featured');
          }
        } else if (loggedIn && this.loaded && !this.loadedUserOffers) {
          this.store.dispatch(this.offerActions.getOffers());
        }
      });

    this.offersUnsorted$ = this.store.let(getOfferCollection());
    this.offersUnsorted$
      .takeUntil(this.destroyed$)
      .subscribe(offers => {
        this.pages = [];
        for (let i = 0; i < offers.length / this.offersPerPage; i++) {
          this.pages.push(i + 1);
        }
      });
    this.sortBy$
      .takeUntil(this.destroyed$)
      .subscribe((sortBy: string) => {
        if (sortBy === 'feature') {
          this.offersSorted$ = this.offersUnsorted$
            .map(arr => arr.sort(
              firstBy(sortBy, { direction: - 1 })
                .thenBy('order').thenBy('name')));
        } else {
          this.offersSorted$ = this.offersUnsorted$
            .map(arr => arr.sort(
              firstBy(sortBy, { direction: sortBy === 'costToUser' ? 1 : - 1 })
                .thenBy('popularityRank', 1)
                .thenBy('popularityRank2', 1)
                .thenBy('featured', -1)
                .thenBy('order')));
        }
        this.pageOffset$
          .takeUntil(this.destroyed$)
          .subscribe(offset => {
            if (offset !== 'all') {
              this.offers$ = this.offersSorted$
                .map(arr => arr.slice((offset - 1) * this.offersPerPage,
                  this.offersPerPage * (offset)));
            } else {
              this.offers$ = this.offersSorted$;
            }

            let completed = (arr: Offer[], offerIds) => {
              return arr.filter(offer => offerIds.includes(offer.id));
            };
            this.credits$ = this.store.let(getCreditCollection());
            this.credits$
              .takeUntil(this.destroyed$)
              .filter(credits => credits.length > 0)
              .subscribe(credits => {
                this.creditedOfferIds = credits.map(credit => credit.offerId);
                this.offersCompleted$ = Observable.combineLatest(
                  this.offersSorted$, Observable.of(this.creditedOfferIds), completed);
              });
          });
        this.pageOffset$.next(this.selectedPage);
      });

    this.creditTotal$ = store.let(getCreditTotal());
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
  }

  ngOnInit() {
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
    let lastUpdate$ = this.store.select(s => s.offer.lastUpdatedAt);
    let lastUpdate;
    lastUpdate$
      .takeUntil(this.destroyed$)
      .subscribe(l => {
        if (!lastUpdate) {
          lastUpdate = l;
        } else if (lastUpdate && lastUpdate !== l) {
          if (this.loggedIn) {
            this.store.dispatch(this.offerActions.getOffers());
          } else {
            this.store.dispatch(this.offerActions.getViewOffers());
          }
        }
      });
    this.offerRankUpdatedAt$ = this.store.let(getOfferRankUpdatedAt());
    this.store.dispatch(this.offerActions.getOffersUpdatedAt());
  }

  ngAfterViewInit() {
    if (this.route.snapshot.params['new']) {
      (typeof document !== 'undefined') ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
    }
  }

  goToOfferDetails(offer: Offer) {
    if (offer.hideToUnQualifiedUsers && offer.qualificationLevel > this.userLevel) {
      return this.openConfirmDialog(
        `You are currently on Level ${this.userLevel}.
        <br>This offer is restricted to users on level ${offer.qualificationLevel}
        and above. You must level up in order to complete this offer.`
      );
    }
    this.router.navigate(['offers', 'offer-details', { id: offer.id }]);
  }

  checkOffer(event: { id: string, creditValue: number, checked: boolean }) {
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
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = message;
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogRef) {
      this.confirmDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
