import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Referral } from '../../../../models/referral';

@Component({
  selector: 'os-referral-dialog',
  template: `
  <div class="referral-details">Referral Summary</div>
  <div>Username: {{referral.username}}</div>
  <div>Email: {{referral.email}}</div>
  <div>Current Level: {{referral.currentLevel}}</div>
  <div>Previous Level: {{referral.payBeyondLevel}}</div>
  <div [ngClass]="{'primary': (referral.currentLevel - referral.payBeyondLevel) > 0 }">
    <b>Unpaid Levels: {{referral.currentLevel - referral.payBeyondLevel}}</b>
  </div>
  <div>Eligible for new order: <b>{{referral.leveledUp ? 'true' : 'false'}}</b></div>
  <div class="warn bold" *ngIf="referral.hold">
    On Hold: {{referral.hold ? 'true' : 'false' }}<br>
    {{referral.holdReason}}
  </div>
  <button type="button" md-button color="accent" (click)="dialogRef.close()">CLOSE</button>`, // tslint:disable-line
  styles: [`.referral-details { border-bottom: 1px solid #ffe1ad; border-top: 1px solid #ffe1ad;
    color: #ffb436 } button { margin-top: 5px; width: 100%; }`]
})
export class ReferralDetailsDialog {
  referral: Referral;
  jazzMessage = 'Jazzy jazz jazz';

  constructor(public dialogRef: MdDialogRef<ReferralDetailsDialog>) { }
}
