import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { combineSort } from '../../helper/combine-sort';
import { RegexValues } from '../../validators';

import { AppState } from '../../reducers';
import { Credit } from '../../models/credit';
import { Prize } from '../../models/prize';
import { Referral } from '../../models/referral';
import { User } from '../../models/user';

import { ReferralsTable } from './common/referrals-table';
import { NotifyActions } from '../../actions/notify';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { getPrize, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getCreditCollection, getCreditTotal } from '../../reducers/user';
import {
  getReferralCollection, getReferral, getUser, getUserLoaded, getUserLoading,
  getUserSettingPrize
} from '../../reducers/user';

@Component({
  selector: 'os-status',
  templateUrl: './status.html',
  styleUrls: ['./status.css']
})

export class Status implements OnDestroy {
  changePrize = false;
  credits$: Observable<Credit[]>;
  creditsShown: boolean;
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizes$: Observable<Prize[]>;
  referrals$: Observable<Referral[]>;
  reverse = false;
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  sortingBy: { sortBy: string, reverse: boolean };
  sponsorForm: FormGroup;
  updatedAt: string;
  updatedAt$: Observable<string>;
  user$: Observable<User>;
  user: User;
  @ViewChild(ReferralsTable) referralTable: ReferralsTable;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private notifyActions: NotifyActions,
    private prizeActions: PrizeActions,
    private userActions: UserActions
  ) {
    this.selectPrizeForm = fb.group({ 'selectedPrize': null });
    this.sponsorForm = fb.group(
      {
        'sponsorUserName': ['', [Validators.required, Validators.pattern(RegexValues.username)]]
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

  getReferral(referral: User) {
    this.store.dispatch(this.userActions.getReferral(referral.id));
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
  }
}
