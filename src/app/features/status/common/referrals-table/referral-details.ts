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
    <ng-container *ngIf="referral.currentSponsor">
      <div *ngIf="startedFrom">Start at Level: {{startedFrom}}</div>
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
    </ng-container>
    <ng-container *ngIf="!referral.currentSponsor">
      <div>Level At Transfer: {{referral.currentLevel}}</div>
      <b>Unpaid Levels: 0</b>
      <div><b>User was transferred by user request.</b></div>
    </ng-container>
    <button type="button" md-button color="accent" (click)="dialogRef.close()">CLOSE</button>
  </ng-container>`, // tslint:disable-line
  styles: [`.referral-details { border-bottom: 1px solid #ffe1ad; border-top: 1px solid #ffe1ad;
    color: #ffb436 } button { margin-top: 5px; width: 100%; }`]
})
export class ReferralDetailsDialog implements OnInit {
  credits = 0;
  startedFrom = 0;
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
    if (this.referral.levels[0][0] !== 0) {
      this.startedFrom = this.referral.levels[this.referral.levels.length - 1][0];
    }
  }
}
