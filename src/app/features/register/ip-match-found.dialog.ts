import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'os-referral-dialog',
  template: `
  <ng-container>
    <mat-card class="os-message-card warn-background white">
      <h5>Your IP address {{ip}} <span *ngIf="ISP">({{ISP}})</span> matches with another user!</h5>
    </mat-card>
    <p>You have an internet connection match with a user
    that is already registered on our site. Continuing to register with this connection might result
    in your account being placed on identity hold in which you will have to send in proof of
    identity/address to remove the hold.</p>
    <h5>Do you wish to register with this IP?</h5>
    <button type="button" mat-button color="warn"
      (click)="dialogRef.close(true)">YES</button>
    <button type="button" mat-button color="primary"
      (click)="dialogRef.close()">NO</button>
  </ng-container>`, // tslint:disable-line
  styles: [` button { margin-top: 5px; width: 100%; }
  p {text-align: justify; font-size: 15px; margin-top: 5px; }
  h5 {text-align: center; font-size: 18px;}`]
})
export class IPMatchFoundDialog {
  ip: string;
  ISP: string;
  constructor(public dialogRef: MatDialogRef<IPMatchFoundDialog>) { }

}
