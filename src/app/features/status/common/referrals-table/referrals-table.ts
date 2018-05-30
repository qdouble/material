import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { Subject } from 'rxjs/Subject';

import { ReferralDetailsDialog } from './referral-details';
import { User } from '../../../../models/user';

@Component({
  selector: 'os-referrals-table',
  templateUrl: './referrals-table.html',
  styleUrls: ['./referrals-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralsTable implements AfterViewInit, OnInit, OnDestroy {
  @Input() loading: boolean;
  @Input() referrals: User[] = [];
  @Input() showHidden: boolean;
  @Output() getReferral = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() selectReferral = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewReferral = new EventEmitter();
  displayedColumns = ['addedOn', 'username', 'currentLevel', 'actions'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize = 10;
  selectedRowIndex: number = -1;
  leveledUpRefs: string[] = [];
  onHoldRefs: string[] = [];
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
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>(this.referrals);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  ngAfterViewInit() {
    this.leveledUpRefs = this.referrals
      .filter(r => r !== undefined)
      .filter(r => r.leveledUp)
      .map(r => r.id);
    this.onHoldRefs = this.referrals
      .filter(r => r !== undefined)
      .filter(r => r.hold)
      .map(r => r.id);
    this.dataSource.paginator = this.paginator;
  }

  open(referral) {
    this.dialogRef = this.dialog.open(ReferralDetailsDialog, this.config);
    this.dialogRef.componentInstance.referral = referral;

    this.dialogRef
      .afterClosed()
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
