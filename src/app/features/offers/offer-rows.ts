import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer } from '../../models/offer';

@Component({
  selector: 'os-offer-rows',
  templateUrl: './offer-rows.html',
  styleUrls: ['./offer-rows.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferRows {
  publish = PUBLISH;
  offer: Offer;
  @Input() addUp: boolean;
  @Input() creditedOfferIds: string[];
  @Input() loggedIn: boolean;
  @Input() mobile: boolean;
  @Input() offers: Offer[];
  @Input() showingAvailable: boolean;
  @Input() hidePopularityRank: boolean;
  @Input() sideNavOpen: boolean;
  @Input() creditTotal: number;
  @Output() checkOffer = new EventEmitter();
  @Output() goToOfferDetails = new EventEmitter();
  trackById(index: number, offer: Offer) {
    return offer.id;
  }
}
