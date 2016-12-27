import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Referral } from '../../../../models/referral';

@Component({
  selector: 'os-referral-dialog',
  template: `
  <ng-container>
    <div class="referral-details">Referral Summary</div>
    <div>Username: {{referral.username}}</div>
    <div>Email: {{referral.email}}</div>
    <div>Current Level: {{referral.currentLevel}}</div>
    <div>Previous Level: {{referral.payBeyondLevel}}</div>
    <div>Credits: {{credits | number: '1.2-2'}}</div>
    <div [ngClass]="{'primary': (referral.currentLevel - referral.payBeyondLevel) > 0 }">
      <b>Unpaid Levels: {{referral.currentLevel - referral.payBeyondLevel}}</b>
    </div>
    <div>Eligible for new order: <b>{{referral.leveledUp ? 'true' : 'false'}}</b></div>
    <div class="warn bold" *ngIf="referral.hold">
      On Hold: {{referral.hold ? 'true' : 'false' }}<br>
      {{referral.holdReason}}
    </div>
    <button type="button" md-button color="accent" (click)="dialogRef.close()">CLOSE</button>
  </ng-container>`, // tslint:disable-line
  styles: [`.referral-details { border-bottom: 1px solid #ffe1ad; border-top: 1px solid #ffe1ad;
    color: #ffb436 } button { margin-top: 5px; width: 100%; }`]
})
export class ReferralDetailsDialog implements OnInit {
  credits = 0;
  referral: Referral;

  constructor(public dialogRef: MdDialogRef<ReferralDetailsDialog>) { }
  ngOnInit() {
    if (this.referral.credits && this.referral.credits.length > 0) {
      this.referral.credits.forEach(credit => {
        if (credit.active) {
          this.credits += credit.creditValue;
        }
      });
    }
  }
}
