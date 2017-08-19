/* tslint:disable max-line-length */
import { Component, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Offer } from '../models/offer';

@Component({
  selector: 'os-credited-offer-dialog',
  template: `
  <div class="credited-offer-dialog">
    <h5>Congratulations!</h5>
    <h6 class="offer-details">
      You've Received {{offer.creditValue | number: '1.2-2'}} Credits for {{offer.displayName}}!
    </h6>
    <div><img class="os-offer-card-image" [src]="publish ? 'https://levelrewards.com/images/offer-images/' + offer.filename : (offer.directImageURL?.length > 1 ? offer.directImageURL : offer.imageURL)" [alt]="offer.displayName"></div>
    <div class="offer.reminder">
        <span>
          <p class="main-text" *ngIf="!offer.reminder">Be sure to fully try out offer for at least 90% of the trial period.</p>
          <pre class="main-text" *ngIf="offer.reminder">{{offer.reminder}}</pre>
        </span>
        <p>Our advertisers expect our users to fully try out their offers.</p>
        <p>Quick cancellation or failure to try offer may result in your credit being revoked and your account being placed on hold.</p>
    </div>
    <button type="button" md-button color="primary" (click)="dialogRef.close()">CONTINUE</button>
  </div>`,
  styles: [`.credited-offer-dialog{ text-align: center; }
  .os-offer-card-image { max-height: 100px; max-width: 200px; } h5, h6 { margin: 0 } h5 { color: #638b35 }
  .main-text{ font-weight: bold; font-size: 15px }
  .credited-offer-dialog button { margin-top: 5px; width: 100%; }
  .mat-dialog-container {
    background: #fff !important;
    padding: 24px !important;
    max-width: 80vw !important;
  }
  `],
  encapsulation: ViewEncapsulation.None
})
export class CreditedOfferDialog {
  offer: Offer;
  publish = PUBLISH;
  constructor(public dialogRef: MdDialogRef<CreditedOfferDialog>) { }
}
