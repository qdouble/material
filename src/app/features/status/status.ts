import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import * as prizeActions from '../../actions/prize';
import * as userActions from '../../actions/user';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { combineSort } from '../../helper/combine-sort';
import { Credit } from '../../models/credit';
import { Prize } from '../../models/prize';
import { Referral } from '../../models/referral';
import { SortModel } from '../../models/ui';
import { User } from '../../models/user';
import * as fromStore from '../../reducers';
import { log } from '../../services/constants';
import { ReferralsTable } from './common/referrals-table';

@Component({
  selector: 'os-status',
  templateUrl: './status.html',
  styleUrls: ['./status.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class Status implements OnDestroy, OnInit {
  changePrize = false;
  confirmDialogRef: MatDialogRef<ConfirmDialog>;
  confirmDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>;
  creditsShown: boolean = true;
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  hideStatus: boolean;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizes$: Observable<Prize[]>;
  referralSelect = new FormControl(' ');
  referrals$: Observable<Referral[]>;
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  selectedReferralIds: string[];
  selectedReferralIds$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  showAnnouncements: boolean = true;
  sortingBy: { sortBy: string; reverse: boolean };
  sponsorForm: FormGroup;
  switchSponsor: boolean;
  updatedAt: string;
  updatedAt$: Observable<string>;
  user$: Observable<User>;
  user: User;
  @ViewChild(ReferralsTable) referralTable: ReferralsTable;
  constructor(
    public dialog: MatDialog,
    private facebook: FacebookService,
    private fb: FormBuilder,
    private store: Store<fromStore.AppState>
  ) {
    facebook.init({
      appId: '1784209348260534',
      version: 'v2.10'
    });
    this.selectPrizeForm = this.fb.group({ selectedPrize: null });
    this.sponsorForm = this.fb.group({
      sponsorUserName: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.loaded$ = store.pipe(select(fromStore.getUserLoaded));
    this.loading$ = store.pipe(select(fromStore.getUserLoading));
    store
      .pipe(
        select(fromStore.getPrizeLoaded),
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe(loaded => {
        if (loaded) this.store.dispatch(new prizeActions.GetPrizes());
      });
    this.settingPrize$ = store.pipe(select(fromStore.getUserSettingPrize));
    let referralsUnsorted$ = store.pipe(select(fromStore.getUserReferralCollection));
    let sortReferralBy$ = store.select(s => s.user.sortReferralBy);
    let sortReferralsByToArray$ = sortReferralBy$.pipe(map(sort => [sort.sortBy, sort.reverse]));
    sortReferralBy$.subscribe(sort => (this.sortingBy = sort));
    this.referrals$ = combineLatest(sortReferralsByToArray$, referralsUnsorted$, combineSort);
    this.user$ = store.pipe(select(fromStore.getUserProfile));
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user;
      if (user && user.holdReason === 'Identification Hold - Suspicious Activity') {
        this.hideStatus = true;
      }
      this.store.dispatch(new prizeActions.SelectPrize(user.selectedPrize));
      this.prize$ = this.store.pipe(select(fromStore.getSelectedPrize));
      this.prizes$ = this.store.pipe(select(fromStore.getPrizeCollection));
      this.selectedPrizeLabels$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.name)));
      this.selectedPrizeValues$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.id)));
      this.prizes$.pipe(takeUntil(this.destroyed$)).subscribe(prizes => {
        if (prizes && prizes.length > 0) {
          let selectedPrize = this.selectPrizeForm.get('selectedPrize');
          if (!selectedPrize.value && this.user.selectedPrize !== undefined) {
            this.user.selectedPrize !== undefined
              ? selectedPrize.setValue(user.selectedPrize)
              : selectedPrize.setValue(prizes[0].id);
          }
        } else {
          this.store.dispatch(new prizeActions.GetPrizes());
        }
      });
    });
    this.credits$ = store.pipe(select(fromStore.getUserCreditCollection));
    this.creditTotal$ = store.pipe(select(fromStore.getUserCreditTotal));

    this.updatedAt$ = store.select(s => s.user.updatedAt);
    this.updatedAt$.pipe(takeUntil(this.destroyed$)).subscribe(updatedAt => {
      this.updatedAt = updatedAt;
      if (updatedAt) {
        this.store.dispatch(new userActions.CheckIfUserUpdated());
      }
    });
    let lastUpdate$ = store.select(s => s.user.lastUpdate);
    lastUpdate$
      .pipe(
        filter(l => l !== null && l !== undefined),
        takeUntil(this.destroyed$)
      )
      .subscribe(lastUpdate => {
        if (this.updatedAt && lastUpdate !== this.updatedAt) {
          store.dispatch(new userActions.GetProfile());
        }
      });
  }

  ngOnInit() {
    this.selectedReferralIds$ = this.store.pipe(select(fromStore.getSelectedReferralIds));
    this.selectedReferralIds$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(ids => (this.selectedReferralIds = ids));
  }

  applyToChecked(event) {
    switch (event) {
      case 'hide':
        this.hideReferrals(true);
        break;
      case 'show':
        this.hideReferrals(false);
        break;
      case 'remove':
        this.removeReferrals();
        break;
      default:
    }
  }

  cancelPrizeChange() {
    if (this.user.selectedPrize) {
      this.selectPrizeForm.get('selectedPrize').setValue(this.user.selectedPrize);
    }
    this.changePrize = false;
  }

  changeSelectedPrize() {
    if (this.changePrize) {
      this.store.dispatch(
        new userActions.ChangeSelectedPrize(this.selectPrizeForm.get('selectedPrize').value)
      );
      this.settingPrize$
        .pipe(
          filter(s => s !== false),
          takeUntil(this.destroyed$)
        )
        .subscribe(() =>
          setTimeout(() => {
            this.changePrize = false;
          }, 50)
        );
    } else {
      this.changePrize = true;
    }
  }

  deselectAllReferrals() {
    this.store.dispatch(new userActions.DeselectAllReferrals());
  }

  deselectReferrals(ids: string[]) {
    this.store.dispatch(new userActions.DeselectReferrals(ids));
  }

  fbShare() {
    const options: UIParams = {
      method: 'share',
      href: 'https://levelrewards.com/register?ref=' + this.user.username
    };

    this.facebook
      .ui(options)
      .then((res: UIResponse) => {
        log('Got the users profile', res);
      })
      .catch(this.handleError);
  }

  getReferral(id: string) {
    this.store.dispatch(new userActions.GetReferral(id));
    this.loading$
      .pipe(
        filter(l => l === false),
        take(1)
      )
      .subscribe(() => {
        let referral$ = this.store.pipe(select(fromStore.getUserReferralDetails));
        referral$.pipe(take(1)).subscribe(ref => {
          this.referralTable.open(ref);
        });
      });
  }

  hideReferrals(hide: boolean) {
    this.store.dispatch(
      new userActions.HideReferrals({
        ids: this.selectedReferralIds,
        hide: hide
      })
    );
  }

  removeReferrals() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    // tslint:disable-next-line:max-line-length
    this.confirmDialogRef.componentInstance.confirmText = `Are you sure you sure you want to remove the
      ${this.selectedReferralIds.length} selected referral(s)?`;
    this.confirmDialogRef.componentInstance.confirmColor = '#FFA000';
    // tslint:disable-next-line:max-line-length
    this.confirmDialogRef.componentInstance.subtext = `Removing your referrals means they will no longer be under you. This cannot be undone.`;
    this.confirmDialogRef.componentInstance.subtextColor = '#F44336';

    if (this.confirmDialogRef) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(new userActions.RemoveReferrals(this.selectedReferralIds));
          }
          this.confirmDialogRef = null;
        });
    }
  }

  selectReferral(selected: { id: string; checked: boolean }) {
    if (selected.checked) {
      this.selectReferrals([selected.id]);
    } else {
      this.deselectReferrals([selected.id]);
    }
  }

  selectReferrals(ids: string[]) {
    this.store.dispatch(new userActions.SelectReferrals(ids));
  }

  sortBy(event: SortModel) {
    this.store.dispatch(new userActions.SortReferralsBy(event));
  }

  submitSponsor() {
    this.store.dispatch(new userActions.SetSponsor(this.sponsorForm.get('sponsorUserName').value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.deselectAllReferrals();
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }
}
