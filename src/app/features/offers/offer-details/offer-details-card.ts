import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer } from '../../../models/offer';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferDetailsCard {
  agree: boolean;
  @Input() offer: Offer;
  @Input() publish: boolean;
  @Output() continueToOffer = new EventEmitter();
}
