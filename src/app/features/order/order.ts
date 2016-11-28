import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RegexValues } from '../../validators';

import { PrizeActions } from '../../actions/prize';
import { OrderActions } from '../../actions/order';
import { UserActions } from '../../actions/user';
import { Prize } from '../../models/prize';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { AppState } from '../../reducers';
import { getPrize, getPrizeCollection } from '../../reducers/prize';
import { getOrderPlacing, getOrderCollection, getOrderLoaded } from '../../reducers/order';
import { getUser, getUserLoaded, getUserSettingPrize } from '../../reducers/user';

@Component({
  selector: 'os-order',
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})

export class OrderComponent implements OnDestroy {
  changePrize = false;
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  loaded$: Observable<boolean>;
  orders$: Observable<Order[]>;
  ordersLoaded$: Observable<boolean>;
  placing$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizeLabels: string[];
  prizeValues: string[];
  prizes$: Observable<Prize[]>;
  prizes: Prize[];
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  user: User;
  user$: Observable<User>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private orderAction: OrderActions,
    private prizeActions: PrizeActions,
    private userActions: UserActions
  ) {
    this.f = fb.group({
      firstName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      lastName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      email: ['', [Validators.required, Validators.pattern(RegexValues.email)]],
      address: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      city: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      State: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      zipCode: ['', [Validators.required, Validators.pattern(RegexValues.zipCode)]],
      paypal: ['', [Validators.pattern(RegexValues.email)]],
      selectedPrize: ['']
    });
    this.loaded$ = store.let(getUserLoaded());
    this.placing$ = store.let(getOrderPlacing());
    this.selectPrizeForm = fb.group({ 'selectedPrize': null });
    this.settingPrize$ = store.let(getUserSettingPrize());
    this.user$ = store.let(getUser());
    this.user$
      .takeUntil(this.destroyed$)
      .subscribe(user => {
        this.user = user;
        this.f.patchValue(user);
        this.prize$ = this.store.let(getPrize(user.selectedPrize));
        this.prizes$ = this.store.let(getPrizeCollection());
        this.selectedPrizeLabels$ = this.prizes$.map(prizes => prizes.map(prize => prize.name));
        this.selectedPrizeValues$ = this.prizes$.map(prizes => prizes.map(prize => prize.id));
        this.selectedPrizeLabels$
          .takeUntil(this.destroyed$)
          .subscribe(labels => this.prizeLabels = labels);
        this.selectedPrizeValues$
          .takeUntil(this.destroyed$)
          .subscribe(values => this.prizeValues = values);
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
      this.store.dispatch(this.orderAction.getOrders());
      this.orders$ = this.store.let(getOrderCollection());
      this.ordersLoaded$ = this.store.let(getOrderLoaded());
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

  placeOrder() {
    let f = this.f.value;
    f = Object.assign({}, f, {
      selectedPrizeName: this.prizeLabels[this.prizeValues.indexOf(f['selectedPrize'])],
      selectedPrizeId: f['selectedPrize']
    });
    delete f['selectedPrize'];
    this.store.dispatch(this.orderAction.placeOrder(f));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
