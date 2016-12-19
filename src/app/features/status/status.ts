import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RegexValues } from '../../validators';

import { AppState } from '../../reducers';
import { Prize } from '../../models/prize';
import { Referral } from '../../models/referral';
import { User } from '../../models/user';

import { ReferralsTable } from './common/referrals-table';
import { NotifyActions } from '../../actions/notify';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { getPrize, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getCreditTotal } from '../../reducers/user';
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
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizes$: Observable<Prize[]>;
  referrals$: Observable<Referral[]>;
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  sponsorForm: FormGroup;
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
    this.referrals$ = store.let(getReferralCollection());
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
    this.creditTotal$ = store.let(getCreditTotal());
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

  submitSponsor() {
    this.store.dispatch(this.userActions.setSponsor(this.sponsorForm.get('sponsorUserName').value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
