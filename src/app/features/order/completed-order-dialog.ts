/* tslint:disable max-line-length */
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Order } from '../../models/order';

@Component({
  selector: 'os-completed-order-dialog',
  template: `
    <div class="completed-order-dialog">
      <h5>Congratulations, Your Order Has Been Paid!</h5>
      <h6>Share a screenshot of your payment and inspire others!</h6>
      <img src="assets/jpg/proof-pic-group-banner.jpg">
      <a href="https://www.facebook.com/groups/irproofpics/?congrats=true" target="_blank"><button md-raised-button color="primary" class="white">Go to Proof Pic Group</button></a>
      <button md-raised-button color="warn" (click)="dialogRef.close()">Close</button>
  </div>`,
  styles: [`.completed-order-dialog{ text-align: center; }
  img { max-height: 100px; max-width: 200px; } h5, h6 { margin: 0 } h5 { color: #638b35 }
  .main-text{ font-weight: bold; font-size: 15px }
  button { margin-top: 5px; width: 100%; }`]
})
export class CompletedOrderDialog {
  order: Order;
  publish = PUBLISH;
  constructor(public dialogRef: MdDialogRef<CompletedOrderDialog>) { }
}
