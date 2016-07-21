import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer } from '../../models';
import { OfferCard } from './offer-card';

@Component({
  selector: 'offer-rows',
  directives: [OfferCard],
  styles: [`offer-card-image { cursor: pointer }`],
  template: `
  <offer-card *ngFor="let offer of offers">
    <offer-card-feature *ngIf="offer.featured">*Featured</offer-card-feature>
    <offer-card-image (click)="goToOffer.emit(offer.id)">
      <img [src]="offer.imageURL" width="148" alt="Offer Image">
    </offer-card-image>
    <offer-card-name>{{ offer.displayName }}</offer-card-name>
    <offer-card-description>{{ offer.description }}</offer-card-description>
  </offer-card>
  `
})

export class OfferRows {
  @Input() offers: Offer[];
  @Output() goToOffer = new EventEmitter(false);
}
