/* tslint:disable max-line-length */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Offer } from '../models/offer';

@Component({
  selector: 'os-credited-offer-dialog',
  template: `
  <div class="credited-offer-dialog">
    <h5><b>{{offer.unconfirmed ? 'Confirmaton Required' : 'Congratulations!'}}</b></h5>
    <h6 class="offer-details" *ngIf="!offer.unconfirmed">
      You've Received {{offer.creditValue | number: '1.2-2'}} Credits for {{offer.displayName}}!
    </h6>
    <h6 class="offer-details" *ngIf="offer.unconfirmed">
      {{offer.displayName}} requires confirmation for you to fully recieve credit.
    </h6>
    <div><img class="os-offer-card-image" [src]="publish ? 'https://levelrewards.com/images/offer-images/' + offer.filename : (offer.directImageURL?.length > 1 ? offer.directImageURL : offer.imageURL)" [alt]="offer.displayName"></div>
    <div *ngIf="offer.unconfirmed">
        <p class="offer-unconfirmed">
          In order to fully receive {{offer.creditValue}} credits for {{offer.displayName}}. You must meet these confirmation requirements:
        </p>
        <p class="confirmation-directions">
          {{offer.confirmationDirections}}
        </p>
    </div>
    <div class="offer-reminder" *ngIf="!offer.unconfirmed">
        <p *ngIf="needCredits" class="need-credits">You now have {{creditsTotal | number:'1.2-2'}} credits. <b>You need {{needCredits | number: '1.2-2'}} more credits to make to to Level {{nextLevel}}</b> where you will be able to make <b>{{'$' + nextLevel * 5}} per referral</b> who reaches the same level!</p>
    </div>
    <button type="button" mat-raised-button color="primary" class="white" (click)="dialogRef.close()">CONTINUE</button>
    <ng-container *ngIf="!offer.unconfirmed">
      <p class="main-text" *ngIf="!offer.reminder">Be sure to fully try out offer for <u>at least 90% of the trial period</u> as quick/immediate cancellation or not trying the offer can cause your credit to be revoked.</p>
      <pre class="main-text" *ngIf="offer.reminder">{{offer.reminder}}</pre>
    </ng-container>
  </div>`,
  styles: [`.credited-offer-dialog{ text-align: center; max-width: 460px; }
  .os-offer-card-image { max-height: 100px; max-width: 200px; } h5, h6 { margin: 0 } h5 { color: #638b35 }
  .main-text{ font-weight: bold; font-size: 13px; margin-top: 10px; }
  .credited-offer-dialog button { margin-top: 5px; width: 100%; }
  .need-credits, .offer-unconfirmed {font-size: 15px;}
  .confirmation-directions {font-size: 14px; text-align: justify; margin-top: 4px; }
  `]
})
export class CreditedOfferDialog implements OnInit {
  creditsTotal = 0;
  offer: Offer;
  publish = PUBLISH;
  needCredits = 0;
  nextLevel = 0;
  constructor(public dialogRef: MatDialogRef<CreditedOfferDialog>) { }
  ngOnInit() {
    this.nextLevel = Math.ceil(this.creditsTotal);
    this.needCredits = Math.ceil(this.creditsTotal) - this.creditsTotal;
  }
}
