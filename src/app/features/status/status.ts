import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { FacebookService, UIResponse, UIParams } from 'ngx-facebook';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { combineSort } from '../../helper/combine-sort';
import { RegexValues } from '../../validators';

import { AppState } from '../../reducers';
import { Credit } from '../../models/credit';
import { Prize } from '../../models/prize';
import { Referral } from '../../models/referral';
import { User } from '../../models/user';

import { ReferralsTable } from './common/referrals-table';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { getPrize, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getCreditCollection, getCreditTotal } from '../../reducers/user';
import {
  getReferralCollection,
  getReferral,
  getSelectedReferralIds,
  getUser,
  getUserLoaded,
  getUserLoading,
  getUserSettingPrize
} from '../../reducers/user';

@Component({
  selector: 'os-status',
  templateUrl: './status.html',
  styleUrls: ['./status.scss']
})

export class Status implements OnDestroy, OnInit {
  changePrize = false;
  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>;
  creditsShown: boolean;
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizes$: Observable<Prize[]>;
  referralSelect = new FormControl(' ');
  referrals$: Observable<Referral[]>;
  reverse = false;
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  selectedReferralIds: string[];
  selectedReferralIds$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  showAnnouncements: boolean = true;
  showHidden = new FormControl();
  sortingBy: { sortBy: string, reverse: boolean };
  sponsorForm: FormGroup;
  switchSponsor: boolean;
  updatedAt: string;
  updatedAt$: Observable<string>;
  user$: Observable<User>;
  user: User;
  @ViewChild(ReferralsTable) referralTable: ReferralsTable;
  constructor(
    public dialog: MdDialog,
    private facebook: FacebookService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private prizeActions: PrizeActions,
    private userActions: UserActions
  ) {
    facebook.init({
      appId: '1784209348260534',
      version: 'v2.10'
    });
    this.selectPrizeForm = this.fb.group({ 'selectedPrize': null });
    this.sponsorForm = this.fb.group(
      {
        'sponsorUserName': ['', [Validators.required, Validators.minLength(3)]]
      });
    this.loaded$ = store.let(getUserLoaded());
    this.loading$ = store.let(getUserLoading());
    store.let(getPrizeLoaded())
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (loaded) this.store.dispatch(this.prizeActions.getPrizes());
      });
    this.settingPrize$ = store.let(getUserSettingPrize());
    let referralsUnsorted$ = store.let(getReferralCollection());
    let sortReferralBy$ = store.select(s => s.user.sortReferralBy);
    let sortReferralsByToArray$ = sortReferralBy$.map(sort => [sort.sortBy, sort.reverse]);
    sortReferralBy$.subscribe(sort => this.sortingBy = sort);
    this.referrals$ = Observable
      .combineLatest(sortReferralsByToArray$, referralsUnsorted$, combineSort);
    this.user$ = store.let(getUser());
    this.user$
      .takeUntil(this.destroyed$)
      .subscribe(user => {
        this.user = user;
        this.prize$ = this.store.let(getPrize(user.selectedPrize));
        this.prizes$ = this.store.let(getPrizeCollection());
        this.selectedPrizeLabels$ = this.prizes$.map(prizes => prizes.map(prize => prize.name));
        this.selectedPrizeValues$ = this.prizes$.map(prizes => prizes.map(prize => prize.id));
        this.prizes$
          .takeUntil(this.destroyed$)
          .subscribe(prizes => {
            if (prizes && prizes.length > 0) {
              let selectedPrize = this.selectPrizeForm.get('selectedPrize');
              if (!selectedPrize.value && this.user.selectedPrize !== undefined) {
                this.user.selectedPrize !== undefined ? selectedPrize.setValue(user.selectedPrize) :
                  selectedPrize.setValue(prizes[0].id);
              }
            } else {
              this.store.dispatch(this.prizeActions.getPrizes());
            }
          });
      });
    this.credits$ = store.let(getCreditCollection());
    this.creditTotal$ = store.let(getCreditTotal());

    this.updatedAt$ = store.select(s => s.user.updatedAt);
    this.updatedAt$
      .takeUntil(this.destroyed$)
      .subscribe(updatedAt => {
        this.updatedAt = updatedAt;
        if (updatedAt) {
          this.store.dispatch(this.userActions.checkIfUserUpdated());
        }
      });
    let lastUpdate$ = store.select(s => s.user.lastUpdate);
    lastUpdate$
      .filter(l => l !== null && l !== undefined)
      .takeUntil(this.destroyed$)
      .subscribe(lastUpdate => {
        if (this.updatedAt && lastUpdate !== this.updatedAt) {
          store.dispatch(userActions.getProfile());
        }
      });
  }

  ngOnInit() {
    this.selectedReferralIds$ = this.store.let(getSelectedReferralIds());
    this.selectedReferralIds$
      .takeUntil(this.destroyed$)
      .subscribe(ids => this.selectedReferralIds = ids);
  }

  applyToChecked() {
    switch (this.referralSelect.value) {
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
      this.store.dispatch(this.userActions.changeSelectedPrize(
        this.selectPrizeForm.get('selectedPrize').value));
      this.settingPrize$
        .filter(s => s !== false)
        .takeUntil(this.destroyed$)
        .subscribe(() => setTimeout(() => { this.changePrize = false; }, 50));
    } else {
      this.changePrize = true;
    }
  }

  deselectAllReferrals() {
    this.store.dispatch(this.userActions.deSelectAllReferrals());
  }

  deselectReferrals(ids: string[]) {
    this.store.dispatch(this.userActions.deSelectReferrals(ids));
  }

  fbShare() {

    const options: UIParams = {
      method: 'share',
      href: 'https://levelrewards.com/register?ref=' + this.user.username
    };

    this.facebook.ui(options)
      .then((res: UIResponse) => {
        if (ENV === 'development') {
          console.log('Got the users profile', res);
        }
      })
      .catch(this.handleError);

  }

  getReferral(referral: User) {
    if (referral.currentSponsor) {
      this.store.dispatch(this.userActions.getReferral(referral.id));
    }
    this.loading$
      .filter(l => l === false)
      .take(1)
      .subscribe(() => {
        let referral$ = this.store.let(getReferral(referral.id));
        referral$.take(1).subscribe(ref => {
          this.referralTable.open(ref);
        });
      });
  }

  hideReferrals(hide: boolean) {
    this.store.dispatch(this.userActions.hideReferrals({
      ids: this.selectedReferralIds, hide: hide
    }));
  }

  removeReferrals() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText =
      `Are you sure you sure you want to remove the
      ${this.selectedReferralIds.length} selected referral(s)?`;
    this.confirmDialogRef.componentInstance.confirmColor = '#FFA000';
    this.confirmDialogRef.componentInstance.subtext =
      `Removing your referrals means they will no longer be under you. This cannot be undone.`;
    this.confirmDialogRef.componentInstance.subtextColor = '#F44336';

    this.confirmDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(this.userActions.removeReferrals(this.selectedReferralIds));
        }
        this.confirmDialogRef = null;
      });
  }

  selectReferral(select: { id: string, checked: boolean }) {
    if (select.checked) {
      this.selectReferrals([select.id]);
    } else {
      this.deselectReferrals([select.id]);
    }
  }

  selectReferrals(ids: string[]) {
    this.store.dispatch(this.userActions.selectReferrals(ids));
  }

  sortBy(sortBy: string) {
    if (sortBy === this.sortingBy.sortBy) {
      this.store.dispatch(
        this.userActions.sortReferralsBy({ sortBy: sortBy, reverse: !this.sortingBy.reverse }));
    } else {
      this.store.dispatch(
        this.userActions.sortReferralsBy({ sortBy: sortBy, reverse: false }));
    }
  }

  submitSponsor() {
    this.store.dispatch(this.userActions.setSponsor(this.sponsorForm.get('sponsorUserName').value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.deselectAllReferrals();
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }
}
