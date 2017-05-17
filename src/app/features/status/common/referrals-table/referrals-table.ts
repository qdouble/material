import {
  ChangeDetectionStrategy, Component,
  EventEmitter, Input, OnDestroy, Output
} from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Subject } from 'rxjs/Subject';

import { ReferralDetailsDialog } from './referral-details';
import { User } from '../../../../models/user';

@Component({
  selector: 'os-referrals-table',
  templateUrl: './referrals-table.html',
  styleUrls: ['./referrals-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReferralsTable implements OnDestroy {
  dialogRef: MdDialogRef<ReferralDetailsDialog>;
  destroyed$: Subject<any> = new Subject<any>();
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

    this.dialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }
  trackById(index: number, user: User) {
    return user.id;
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
