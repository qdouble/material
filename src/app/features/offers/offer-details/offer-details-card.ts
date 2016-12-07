import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Offer } from '../../../models/offer';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferDetailsCard {
  @Input() offer: Offer;
}
