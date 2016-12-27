import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'os-referral-dialog',
  template: `
  <ng-container>
    <md-card class="os-message-card warn-background white">
      <h5>You have an IP match with another user!</h5>
    </md-card>
    <p>You have an IP address match with a user 
    that is already registered on our site. Continuing to register may result 
    in your account being placed on identity hold and you having to send in proof of ID and Mail
    for verification.
    If you are sharing the same connection as your sponsor, note that doing so is prohibited.</p>
    <h5>Do you wish to register with this IP?</h5>
    <button type="button" md-button color="warn" 
      (click)="dialogRef.close(true)">YES</button>
    <button type="button" md-button color="primary" 
      (click)="dialogRef.close()">NO</button>
  </ng-container>`, // tslint:disable-line
  styles: [` button { margin-top: 5px; width: 100%; }
  p {text-align: center; font-size: 15px; margin-top: 5px; }
  h5 {text-align: center}`]
})
export class IPMatchFoundDialog {

  constructor(public dialogRef: MdDialogRef<IPMatchFoundDialog>) { }

}
