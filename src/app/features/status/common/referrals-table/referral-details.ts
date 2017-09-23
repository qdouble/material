import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Referral } from '../../../../models/referral';

@Component({
  selector: 'os-referral-dialog',
  templateUrl: './referral-details.html',
  styleUrls: ['./referral-details.scss']
})
export class ReferralDetailsDialog implements OnInit {
  creditTotal = 0;
  creditsShown: boolean;
  startedFrom = 0;
  referral: Referral;

  constructor(public dialogRef: MdDialogRef<ReferralDetailsDialog>) { }
  ngOnInit() {
    if (this.referral.credits && this.referral.credits.length > 0) {
      this.referral.credits.forEach(credit => {
        if (credit.active) {
          this.creditTotal += credit.creditValue;
        }
        this.creditTotal = Number(Number(this.creditTotal).toFixed(2));
      });
    }
    if (this.referral.levels[0][0] !== 0) {
      this.startedFrom = this.referral.levels[this.referral.levels.length - 1][0];
    }
  }
}
