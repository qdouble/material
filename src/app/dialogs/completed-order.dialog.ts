/* tslint:disable max-line-length */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Order } from '../models/order';

@Component({
  selector: 'os-completed-order-dialog',
  template: `
    <div class="completed-order-dialog">
      <h5>Congratulations, Your Order Has Been Paid!</h5>
      <h6>Share a screenshot of your payment and inspire others!</h6>
      <p>Showing people that the program works will make it easier for you to get more signups and completions!</p>
      <img src="assets/jpg/fb-proof-banner-congrats.jpg">
      <a href="https://www.facebook.com/groups/irproofpics/?congrats=true" target="_blank"><button mat-raised-button color="primary" class="white">Go to Proof Pic Group</button></a>
      <button mat-button color="warn" (click)="dialogRef.close()">Close</button>
  </div>`,
  styles: [
    `.completed-order-dialog{ text-align: center; max-width: 500px; }
  .completed-order-dialog img { max-width: 100%; } h5, h6 { margin: 0 }
  .completed-order-dialog h5 { color: #638b35; margin-bottom: 10px; } h6 { font-weight: bold; }
  .main-text{ font-weight: bold; font-size: 15px }
  .completed-order-dialog button { margin-top: 5px; width: 100%; }
  `
  ]
})
export class CompletedOrderDialog {
  order: Order;
  publish = PUBLISH;
  constructor(public dialogRef: MatDialogRef<CompletedOrderDialog>) {}
}
