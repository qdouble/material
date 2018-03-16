import {
  ChangeDetectionStrategy, Component,
  EventEmitter, Input, OnDestroy, Output
} from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
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
  dialogRef: MatDialogRef<ReferralDetailsDialog>;
  destroyed$: Subject<any> = new Subject<any>();
  lastCloseResult: string;
  config: MatDialogConfig = {
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
  @Input() showHidden: boolean;
  @Output() getReferral = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() selectReferral = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewReferral = new EventEmitter();
  constructor(public dialog: MatDialog) { }

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
