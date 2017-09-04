/* tslint:disable max-line-length */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
          <p class="main-text" *ngIf="!offer.reminder">Be sure to fully try out offer for at least 90% of the trial period as quick/immediate cancellation or not trying the offer can cause your credit to be revoked.</p>
          <pre class="main-text" *ngIf="offer.reminder">{{offer.reminder}}</pre>
        </span>
        <p *ngIf="needCredits" class="need-credits">You now have {{creditsTotal | number:'1.2-2'}} credits. You need {{needCredits | number: '1.2-2'}} more credits to make to to level {{nextLevel}} where you will be able to make {{'$' + nextLevel * 5}} per referral who reaches the same level!</p>
    </div>
    <button type="button" md-raised-button color="primary" class="white" (click)="dialogRef.close()">CONTINUE</button>
  </div>`,
  styles: [`.credited-offer-dialog{ text-align: center; }
  .os-offer-card-image { max-height: 100px; max-width: 200px; } h5, h6 { margin: 0 } h5 { color: #638b35 }
  .main-text{ font-weight: bold; font-size: 13px }
  .credited-offer-dialog button { margin-top: 5px; width: 100%; }
  .mat-dialog-container {
    background: #fff !important;
    padding: 24px !important;
    max-width: 80vw !important;
  }
  .need-credits {font-size: 15px;}
  `],
  encapsulation: ViewEncapsulation.None
})
export class CreditedOfferDialog implements OnInit {
  creditsTotal = 0;
  offer: Offer;
  publish = PUBLISH;
  needCredits = 0;
  nextLevel = 0;
  constructor(public dialogRef: MdDialogRef<CreditedOfferDialog>) { }
  ngOnInit() {
    this.nextLevel = Math.ceil(this.creditsTotal);
    this.needCredits = Math.ceil(this.creditsTotal) - this.creditsTotal;
  }
}
