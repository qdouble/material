import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Referral } from '../../../../models/referral';
import { spinScaleAnimation } from '../../../../animations/spin-scale.animation';
import { pulseAnimation } from '../../../../animations/pulse.animation';
import { trigger, transition, keyframes, style, animate } from '@angular/animations';

@Component({
  selector: 'os-referral-dialog',
  templateUrl: './referral-details.html',
  styleUrls: ['./referral-details.scss'],
  animations: [
    // spinScaleAnimation('enter'),
    trigger('spinScale', [
      transition('void => *', [
        animate(
          `${425}ms ${200}ms`,
          keyframes([
            style({ opacity: 1, transform: 'rotate(0) scale(1)', offset: 0 }),
            style({ opacity: 1, transform: `rotate(${360}deg) scale(1)`, offset: 0.4 }),
            style({ opacity: 1, transform: `rotate(${360}deg) scale(1.5)`, offset: 0.5 }),
            style({ opacity: 1, transform: `rotate(${360}deg) scale(1)`, offset: 1.0 })
          ])
        )
      ])
    ]),
    trigger('pulse', [
      transition('void => *', [
        animate(
          `${200}ms ${470}ms`,
          keyframes([
            style({ opacity: 1, transform: `scale(1)`, offset: 0 }),
            style({ opacity: 0.9, transform: `scale(${1.5})`, offset: 0.4 }),
            style({ opacity: 1, transform: `scale(1)`, offset: 1.0 })
          ])
        )
      ])
    ])
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
