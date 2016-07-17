import { Component } from '@angular/core';
import { OfferRows } from './offer-rows';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { OfferActions } from '../../actions';
import { Offer } from '../../models';
import { AppState, getOfferCollection, getOfferLoaded } from '../../reducers';

@Component({
  selector: 'offers',
  directives: [OfferRows],
  template: `

  <header>
    <h1>Offers</h1>
  </header>
  <main>
  </main>
  <pre>{{offers$ | async | json}}</pre>
  `
})

export class Offers {
  offers$: Observable<Offer[]>;
  loaded$: Observable<boolean>;
  loaded: boolean;
  loadedSub: Subscription;
  lastLoad: any;
  constructor(
    private offerActions: OfferActions,
    private store: Store<AppState>
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
}
