import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { combineSort } from '../../helper/combine-sort';
import { RegexValues } from '../../validators';

import { AppState } from '../../reducers';
import { Prize } from '../../models/prize';
import { Referral } from '../../models/referral';
import { User } from '../../models/user';

import { NotifyActions } from '../../actions/notify';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { getPrize, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getCreditTotal } from '../../reducers/user';
import {
  getReferralCollection, getUser, getUserLoaded, getUserSettingPrize
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
          .filter(prizes => prizes !== undefined && prizes.length > 0)
          .takeUntil(this.destroyed$)
          .subscribe(prizes => {
            let selectedPrize = this.selectPrizeForm.get('selectedPrize');
            if (!selectedPrize.value && this.user.selectedPrize !== undefined) {
              this.user.selectedPrize !== undefined ? selectedPrize.setValue(user.selectedPrize) :
                selectedPrize.setValue(prizes[0].id);
            }
          });
      });
      this.creditTotal$ = store.let(getCreditTotal());
  }
  ngOnDestroy() {
    this.destroyed$.next();
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

  getReferral(id: string) {
    this.store.dispatch(this.userActions.getReferral(id));
  }

  submitSponsor() {
    this.store.dispatch(this.userActions.setSponsor(this.sponsorForm.get('sponsorUserName').value));
  }
}
