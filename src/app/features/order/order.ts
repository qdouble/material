/* tslint:disable triple-equals max-line-length */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RegexValues } from '../../validators';

import { ConfirmDialog } from '../../dialogs/confirm.dialog';

import { PrizeActions } from '../../actions/prize';
import { OrderActions } from '../../actions/order';
import { UserActions } from '../../actions/user';
import { Prize } from '../../models/prize';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { AppState } from '../../reducers';
import { getPrize, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getOrderPlacing, getOrderCollection, getOrderLoaded } from '../../reducers/order';
import { getUser, getUserLoaded, getUserSettingPrize } from '../../reducers/user';

@Component({
  selector: 'os-order',
  templateUrl: './order.html',
  styleUrls: ['./order.scss']
})

export class OrderComponent implements OnDestroy, OnInit {
  changePrize = false;

  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  currentYear = new Date().getFullYear();
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  loaded$: Observable<boolean>;
  orders$: Observable<Order[]>;
  ordersLoaded$: Observable<boolean>;
  bankCheckId= '1468623188180';
  bankTransferId = '1468623229999';
  needBankInfo: boolean;
  paypalIds = ['1468679688287', '1468679688287'];
  needPaypalEmail: boolean;
  placing$: Observable<boolean>;
  prize$: Observable<Prize>;
  prizeLabels: string[];
  prizeValues: string[];
  prizes$: Observable<Prize[]>;
  prizes: Prize[];
  prizeIsPayPal: boolean;
  selectPrizeForm: FormGroup;
  selectedPrizeLabels$: Observable<string[]>;
  selectedPrizeValues$: Observable<string[]>;
  settingPrize$: Observable<boolean>;
  thisYearEarnings = 0;
  totalEarnings = 0;
  user: User;
  user$: Observable<User>;
  constructor(
    public dialog: MdDialog,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private orderAction: OrderActions,
    private prizeActions: PrizeActions,
    private userActions: UserActions
  ) {
    this.f = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      lastName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      email: ['', [Validators.required, Validators.pattern(RegexValues.email)]],
      address: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      city: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      State: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      zipCode: ['', [Validators.required, Validators.pattern(RegexValues.zipCode)]],
      paypal: [''],
      selectedPrize: [''],
      useSavedBank: false,
      bankName: [{ value: '', disabled: true }, [Validators.pattern(RegexValues.nameValue), Validators.required]],
      accountType: [{ value: 'Checking', disabled: true }],
      routingNumber: [{ value: '', disabled: true }, [Validators.pattern(RegexValues.bankNumbers), Validators.required]],
      accountNumber: [{ value: '', disabled: true }, [Validators.pattern(RegexValues.bankNumbers), Validators.required]]
    });
    this.loaded$ = store.let(getUserLoaded());
    this.placing$ = store.let(getOrderPlacing());
    store.let(getPrizeLoaded())
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (loaded) this.store.dispatch(this.prizeActions.getPrizes());
      });
    this.selectPrizeForm = fb.group({ 'selectedPrize': null });
    this.settingPrize$ = store.let(getUserSettingPrize());
    this.user$ = store.let(getUser());
    this.user$
      .takeUntil(this.destroyed$)
      .subscribe(user => {
        this.user = user;
        this.f.patchValue(user);
        if (this.user.savedAccountNum) {
          this.f.get('useSavedBank').setValue(true);
        }
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
              if (this.user.selectedPrize !== undefined && prizes.includes(this.user.selectedPrize)) {
                selectedPrize.setValue(user.selectedPrize);
              } else if (this.user.selectedPrize === this.bankCheckId) {
                this.store.dispatch(this.userActions.changeSelectedPrize(this.bankTransferId));
              } else {
                selectedPrize.setValue(prizes[0].id);
              }
              this.user.selectedPrize !== undefined ? selectedPrize.setValue(user.selectedPrize) :
                selectedPrize.setValue(prizes[0].id);
            }
          });
      });
    this.store.dispatch(this.orderAction.getOrders());
    this.orders$ = this.store.let(getOrderCollection());
    this.ordersLoaded$ = this.store.let(getOrderLoaded());
    this.orders$
      .filter(orders => Array.isArray(orders) && orders.length > 0)
      .takeUntil(this.destroyed$)
      .subscribe(orders => {
        this.totalEarnings = 0;
        this.thisYearEarnings = 0;
        orders.forEach(order => {
          if (typeof order.amountPaid === 'number') {
            this.totalEarnings += order.amountPaid;
            if (String(this.currentYear) === order.updatedAt.substring(0, 4)) {
              this.thisYearEarnings += order.amountPaid;
            }
          }
        });
      });
  }

  ngOnInit() {
    if (this.paypalIds.includes(this.f.get('selectedPrize').value) &&
      (this.f.get('paypal').value == undefined || this.f.get('paypal').value == ''
        || this.f.get('paypal').value.paypal === ' ')) {
      this.needPaypalEmail = true;
    } else {
      this.needPaypalEmail = false;
    }
    this.f.valueChanges
      .takeUntil(this.destroyed$)
      .subscribe((fValue) => {
        if (this.paypalIds.includes(this.f.get('selectedPrize').value) &&
          (fValue.paypal == undefined || fValue.paypal == '' || fValue.paypal === ' ')) {
          this.needPaypalEmail = true;
        } else {
          this.needPaypalEmail = false;
        }
        if (fValue['selectedPrize'] && this.prizeLabels[this.prizeValues.indexOf(fValue['selectedPrize'])] === 'Bank Transfer') {
          this.needBankInfo = true;
          if (!this.f.get('useSavedBank').value && this.f.get('bankName').disabled) {
            this.f.get('bankName').enable();
            this.f.get('accountType').enable();
            this.f.get('routingNumber').enable();
            this.f.get('accountNumber').enable();
          }
          if (this.f.get('useSavedBank').value && (this.f.get('bankName').enabled)) {
            this.f.get('bankName').disable();
            this.f.get('accountType').disable();
            this.f.get('routingNumber').disable();
            this.f.get('accountNumber').disable();
          }
        } else {
          this.needBankInfo = false;
          if (this.f.get('bankName').enabled) {
            this.f.get('bankName').disable();
            this.f.get('accountType').disable();
            this.f.get('routingNumber').disable();
            this.f.get('accountNumber').disable();
          }
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

  openConfirmDialog(formValue) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText =
      `Are you sure <br><b>${formValue.paypal}</b><br> is your PayPal email address?`;
    this.confirmDialogRef.componentInstance.confirmColor = '#73a03d';
    this.confirmDialogRef.componentInstance.subtext =
      `If your paypal email address is incorrect,
      it may take you a long time to resolve the issue and get paid.
      You cannot switch payment methods after payment is sent.`;
    this.confirmDialogRef.componentInstance.subtextColor = '#F44336';

    this.confirmDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(this.orderAction.placeOrder(formValue));
        }
        this.confirmDialogRef = null;
      });
  }

  openConfirmDialogInvalidPayPal() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText =
      `Your paypal email address is invalid.`;
    this.confirmDialogRef.componentInstance.confirmColor = '#F44336';
    this.confirmDialogRef.componentInstance.subtext =
      `Please enter in a valid paypal email address`;
    this.confirmDialogRef.componentInstance.subtextColor = '#73a03d';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    this.confirmDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        this.confirmDialogRef = null;
      });
  }

  placeOrder() {
    let f = this.f.value;
    f = Object.assign({}, f, {
      selectedPrizeName: this.prizeLabels[this.prizeValues.indexOf(f['selectedPrize'])],
      selectedPrizeId: f['selectedPrize']
    });
    delete f['selectedPrize'];
    let re = /^.+\@.+\..+$/;
    if (f.selectedPrizeName === 'PayPal' && !re.test(String(f.paypal))) {
      this.openConfirmDialogInvalidPayPal();
    } else if (f.selectedPrizeName === 'PayPal') {
      this.openConfirmDialog(f);
    } else {
      this.store.dispatch(this.orderAction.placeOrder(f));
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
