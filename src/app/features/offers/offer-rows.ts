import { Component, Input } from '@angular/core';

import { Offer } from '../../models/offer';

@Component({
  selector: 'os-offer-rows',
  templateUrl: './offer-rows.html',
  styleUrls: ['./offer-rows.css']
})

export class OfferRows {
  offer: Offer;
  @Input() mobile: boolean;
  @Input() offers: Offer[];
  @Input() showingAvailable: boolean;
  @Input() sideNavOpen: boolean;
  @Input() userCredits: number = 0;
  @Input() userLevel: number = 0;
}
