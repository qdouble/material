import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { OfferActions, UserActions } from '../../actions';
import { openInNewTab } from '../../helper';
import { Offer } from '../../models';
import { AppState } from '../../reducers';
import { getOfferCollection, getOfferLoaded } from '../../reducers/offer';

@Component({
  selector: 'os-offers',
  templateUrl: './offers.html'
})

export class Offers implements OnDestroy, OnInit {
  offerE$: Observable<any>;
  offers$: Observable<Offer[]>;
  loaded$: Observable<boolean>;
  loaded: boolean;
  loadedSub: Subscription;
  lastLoad: any;
  constructor(
    private offerActions: OfferActions,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.offers$ = this.store.let(getOfferCollection());
    this.loaded$ = this.store.let(getOfferLoaded());
    this.loadedSub = this.loaded$.subscribe(loaded => {
      this.loaded = loaded;
    });
  }
  ngOnInit() {
    if (!this.loaded) {
      this.store.dispatch(this.offerActions.getOffers());
    }
  }

  goToOffer(offerId) {
    openInNewTab(`offer-redirect?id=${offerId}`);
  }

  ngOnDestroy() {
    this.loadedSub.unsubscribe();
  }
}
