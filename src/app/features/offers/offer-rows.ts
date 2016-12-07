import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Offer } from '../../models/offer';

@Component({
  selector: 'os-offer-rows',
  templateUrl: './offer-rows.html',
  styleUrls: ['./offer-rows.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferRows {
  publish = PUBLISH;
  offer: Offer;
  @Input() loggedIn: boolean;
  @Input() mobile: boolean;
  @Input() offers: Offer[];
  @Input() showingAvailable: boolean;
  @Input() sideNavOpen: boolean;
  @Input() creditTotal: number;
}
