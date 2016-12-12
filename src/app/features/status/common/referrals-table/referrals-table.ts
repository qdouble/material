import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { ReferralDetailsDialog } from './referral-details';
import { User } from '../../../../models/user';

@Component({
  selector: 'os-referrals-table',
  templateUrl: './referrals-table.html',
  styleUrls: ['./referrals-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReferralsTable {
  dialogRef: MdDialogRef<ReferralDetailsDialog>;
  lastCloseResult: string;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  @Input() loading: boolean;
  @Input() referrals: User[];
  @Output() reload = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() getReferral = new EventEmitter();
  @Output() viewReferral = new EventEmitter();
  constructor(public dialog: MdDialog) { }

  open(referral) {
    this.dialogRef = this.dialog.open(ReferralDetailsDialog, this.config);
    this.dialogRef.componentInstance.referral = referral;

    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }
  trackById(index: number, user: User) {
    return user.id;
  }
}
