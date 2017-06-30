import { Component, OnInit, OnDestroy } from '@angular/core';
import {  } from '@angular/form';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { openInNewTab } from '../../../helper/open-in-new-tab';

import { AppState } from '../../../reducers';
import { Offer } from '../../../models/offer';
import { getOffer } from '../../../reducers/offer';
import { OfferActions } from '../../../actions/offer';

@Component({
  selector: 'os-offer-details',
  templateUrl: './offer-details.html',
  styleUrls: ['./offer-details.scss']
})
export class OfferDetailsComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  id: string;
  publish = PUBLISH;
  offer$: Observable<Offer>;
  offer: Offer;

  constructor(
    private offerActions: OfferActions,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    (typeof document !== 'undefined') ? (document.getElementById('important-review').scrollIntoView()) : {};  // tslint:disable-line
    this.route.params.forEach(param => {
      let id = param['id'];
      this.store.dispatch(this.offerActions.getOffer(id));
      this.offer$ = this.store.let(getOffer(id));
      this.offer$
        .takeUntil(this.destroyed$)
        .subscribe(o => {
          this.offer = o;
        });
    });
  }

  continueToOffer(offerId) {
    openInNewTab(`offers/offer-redirect?id=${offerId}`);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
