import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer } from '../../../models/offer';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferDetailsCard {
  accept: boolean;
  agree: boolean;
  @Input() offer: Offer;
  @Input() publish: boolean;
  @Output() continueToOffer = new EventEmitter();
}
