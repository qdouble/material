import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'os-referral-dialog',
  template: `
  <ng-container>
    <md-card class="os-message-card warn-background white">
      <h5>You have an IP match with another user!</h5>
    </md-card>
    <p>You have an internet connection match with a user
    that is already registered on our site. Continuing to register with this connection might result
    in your account being placed on identity hold in which you will have to send in proof of
    identity/address to remove the hold.</p>
    <h5>Do you wish to register with this IP?</h5>
    <button type="button" md-button color="warn"
      (click)="dialogRef.close(true)">YES</button>
    <button type="button" md-button color="primary"
      (click)="dialogRef.close()">NO</button>
  </ng-container>`, // tslint:disable-line
  styles: [` button { margin-top: 5px; width: 100%; }
  p {text-align: justify; font-size: 15px; margin-top: 5px; }
  h5 {text-align: center; font-size: 18px;}`]
})
export class IPMatchFoundDialog {

  constructor(public dialogRef: MdDialogRef<IPMatchFoundDialog>) { }

}
