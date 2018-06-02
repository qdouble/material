import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Referral } from '../../../../models/referral';
import { spinScaleAnimation } from '../../../../animations/spin-scale.animation';
import { pulseAnimation } from '../../../../animations/pulse.animation';
import { trigger, transition, keyframes, style, animate, state } from '@angular/animations';

@Component({
  selector: 'os-referral-dialog',
  templateUrl: './referral-details.html',
  styleUrls: ['./referral-details.scss'],
  animations: [
    pulseAnimation('void => *', 470, 200, 1.5),
    spinScaleAnimation('void => *', 200, 475, 360)
  ]
})
export class ReferralDetailsDialog implements OnInit {
  creditTotal = 0;
  creditsShown: boolean;
  startedFrom = 0;
  referral: Referral;
  show: boolean;

  constructor(public dialogRef: MatDialogRef<ReferralDetailsDialog>) {}
  ngOnInit() {
    if (this.referral.credits && this.referral.credits.length > 0) {
      this.referral.credits.forEach(credit => {
        if (credit.active && !credit.unconfirmed) {
          this.creditTotal += credit.creditValue;
        }
        this.creditTotal = Number(Number(this.creditTotal).toFixed(2));
      });
    }
    if (this.referral.levels[0][0] !== 0) {
      this.startedFrom = this.referral.levels[this.referral.levels.length - 1][0];
    }
    setTimeout(() => {
      this.show = true;
    });
  }
}
