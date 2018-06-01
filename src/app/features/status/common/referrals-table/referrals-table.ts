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
import { MatDialog, MatDialogRef, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { Subject, of, Observable, merge } from 'rxjs';
import { FormControl } from '@angular/forms';

import { ReferralDetailsDialog } from './referral-details';
import { User } from '../../../../models/user';
import {
  startWith,
  takeUntil,
  map,
  filter,
  switchMap,
  catchError,
  distinctUntilChanged
} from 'rxjs/operators';
import { Referral } from '../../../../models/referral';
import { SortModel } from '../../../../models/ui';

@Component({
  selector: 'os-referrals-table',
  templateUrl: './referrals-table.html',
  styleUrls: ['./referrals-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralsTable implements AfterViewInit, OnInit, OnDestroy {
  @Input() loading: boolean;
  @Input() selectedReferralIds$: Observable<string[]>;
  @Output() getReferral = new EventEmitter();
  @Input() referrals$: Observable<Referral[]>;
  @Output() reload = new EventEmitter();
  @Output() selectReferral = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewReferral = new EventEmitter();
  @Output() applyToChecked = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['addedOn', 'username', 'currentLevel', 'actions'];
  footer = ['footerContainer'];
  pageSize = 10;
  totalReferrals = 0;
  referralSelect = new FormControl(' ');
  showHidden = new FormControl('');
  showTransferred = new FormControl('');
  selectedRowIndex: number = -1;
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
  lastSort: SortModel;
  referrals: Referral[];
  hasHiddenReferrals: boolean;
  hasTransferredReferrals: boolean;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.referrals$ = this.referrals$.pipe(
      distinctUntilChanged(),
      filter(refs => refs !== undefined),
      map(refs => refs.filter(r => r !== undefined))
    );

    this.sort.sortChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.showHidden.valueChanges,
      this.showTransferred.valueChanges,
      this.paginator.page,
      this.sort.sortChange
    )
      .pipe(
        startWith({}),
        switchMap(values => {
          if (values === true || values === false) this.paginator.pageIndex = 0;
          if (!Object.keys(values).length) return this.referrals$;
          this.sortBy.emit({ sortBy: this.sort.active, reverse: this.sort.direction === 'asc' });
          return this.referrals$;
        }),
        map(refs => {
          this.hasHiddenReferrals = !!refs.filter(r => r.hidden === true).length;
          this.hasTransferredReferrals = !!refs.filter(r => r.currentSponsor === false).length;

          if (this.hasHiddenReferrals) {
            if (!this.showHidden.value) {
              refs = refs.filter(r => r.hidden !== true);
            } else {
              refs = refs.filter(r => r.hidden === true);
            }
          }

          if (this.hasTransferredReferrals) {
            if (!this.showTransferred.value) {
              refs = refs.filter(r => r.currentSponsor === true);
            } else {
              refs = refs.filter(r => r.currentSponsor !== true);
            }
          }
          this.totalReferrals = refs.length;
          const page = this.paginator.pageIndex;
          const limit = this.paginator.pageSize || this.pageSize;
          return refs.slice(page * limit, page * limit + limit);
        }),
        catchError(() => {
          return of(<Referral[]>[]);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe(referrals => (this.referrals = referrals));
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  ngAfterViewInit() {}

  open(referral) {
    if (!referral) return;
    this.dialogRef = this.dialog.open(ReferralDetailsDialog, this.config);
    this.dialogRef.componentInstance.referral = referral;

    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
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
