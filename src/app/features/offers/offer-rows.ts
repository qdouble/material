import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/offer';

@Component({
  selector: 'os-offer-rows',
  styles: [`offer-card-image { cursor: pointer }`],
  template: `
  <os-offer-card *ngFor="let offer of offers">
    <div class="offer-card-feature" *ngIf="offer.featured">*Featured</div>
    <div class="offer-card-image" (click)="goToOffer.emit(offer.id)">
      <img [src]="offer.imageURL" width="148" alt="Offer Image">
    </div>
    <div class="offer-card-name">{{ offer.displayName }}</div>
    <div class="offer-card-description">{{ offer.description }}</div>
  </os-offer-card>
  `
})

export class OfferRows {
  @Input() offers: Offer[];
  @Output() goToOffer = new EventEmitter(false);
}
