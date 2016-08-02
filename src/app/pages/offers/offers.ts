import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { OfferActions, UserActions } from '../../actions';
import { compareFeatured, compareOrder, openInNewTab } from '../../helper';
import { Offer } from '../../models';
import { AppState, getOfferCollection, getOfferLoaded } from '../../reducers';

@Component({
  selector: 'offers',
  template: require('./offers.html')
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
    // this.store.dispatch(this.userActions.recordClick(value));
  }

  ngOnDestroy() {
    this.loadedSub.unsubscribe();
  }
}
