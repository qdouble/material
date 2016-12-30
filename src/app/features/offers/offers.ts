import {
  AfterViewInit, Component, ChangeDetectionStrategy,
  ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MdUniqueSelectionDispatcher } from '@angular/material';

const firstBy = require('thenby');
import { combineSort } from '../../helper/combine-sort';

import { AppState } from '../../reducers';
import { Credit } from '../../models/credit';
import { Offer } from '../../models/offer';
import { getOfferCollection, getOfferLoaded, getOfferLoadedUserOffers } from '../../reducers/offer';
import { getUIMobile, getUISideNavOpen } from '../../reducers/ui';
import { getCreditCollection, getUserLoggedIn, getCreditTotal } from '../../reducers/user';
import { OfferActions } from '../../actions/offer';
import { UserActions } from '../../actions/user';

@Component({
  selector: 'os-offers',
  templateUrl: './offers.html',
  styleUrls: ['./offers.css'],
  providers: [MdUniqueSelectionDispatcher],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Offers implements AfterViewInit, OnDestroy {
  credits$: Observable<Credit[]>;
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  lastCloseResult: string;
  loaded$: Observable<boolean>;
  loaded: boolean;
  loadedUserOffers$: Observable<boolean>;
  loadedUserOffers: boolean;
  loggedIn$: Observable<boolean>;
  loggedIn: boolean;
  mobile$: Observable<boolean>;
  offers$: Observable<Offer[]>;
  offersUnSorted$: Observable<Offer[]>;
  offersCompleted$: Observable<Offer[]>;
  offersFeatured$: Observable<Offer[]>;
  offersNonFeatured$: Observable<Offer[]>;
  offersAvailable$: Observable<Offer[]>;
  offersAvailableSortBy$: Observable<Offer[]>;
  sideNavOpen$: Observable<boolean>;
  selectedOption = 'Available';
  sortBy = 'featured';
  sortBy$: Subject<any> = new Subject();
  reverse = false;
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
    private cdr: ChangeDetectorRef,
    private offerActions: OfferActions,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userActions: UserActions
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

    this.offersUnSorted$ = this.store.let(getOfferCollection());
    this.sortBy$
      .takeUntil(this.destroyed$)
      .subscribe((sortBy: string) => {
        if (sortBy === 'feature') {
          this.offers$ = this.offersUnSorted$.map(arr => arr.sort(
            firstBy(sortBy, { direction: sortBy === 'costToUser' ? 1 : - 1 })
              .thenBy('order').thenBy('name')));
        } else {
          this.offers$ = this.offersUnSorted$.map(arr => arr.sort(
            firstBy(sortBy, { direction: sortBy === 'costToUser' ? 1 : - 1 })
              .thenBy('featured', -1).thenBy('order').thenBy('name')));
        }
        this.offersAvailable$ = this.offers$;
        let available = (arr: Offer[], offerIds) => {
          return arr.filter(offer => !offerIds.includes(offer.id));
        };
        let completed = (arr: Offer[], offerIds) => {
          return arr.filter(offer => offerIds.includes(offer.id));
        };
        this.credits$ = this.store.let(getCreditCollection());
        this.credits$
          .takeUntil(this.destroyed$)
          .filter(credits => credits.length > 0)
          .subscribe(credits => {
            let creditedOfferIds: string[] = credits.map(credit => credit.offerId);
            this.offersAvailable$ = Observable.combineLatest(
              this.offers$, Observable.of(creditedOfferIds), available);
            this.offersCompleted$ = Observable.combineLatest(
              this.offers$, Observable.of(creditedOfferIds), completed);
          });
      });
    this.creditTotal$ = store.let(getCreditTotal());
  }

  ngAfterViewInit() {
    if (this.route.snapshot.params['new']) {
      (typeof document !== 'undefined') ? (document.getElementById('offers-page').scrollIntoView()) : {};  // tslint:disable-line
    }
  }

  changeSort(value: string | null) {
    this.sortBy$.next(value);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
