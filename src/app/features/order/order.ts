/* tslint:disable triple-equals max-line-length */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { RegexValues } from '../../validators';

import { ConfirmDialog } from '../../dialogs/confirm.dialog';

import * as fromStore from '../../reducers';
import * as prizeActions from '../../actions/prize';
import * as orderActions from '../../actions/order';
import * as userActions from '../../actions/user';
import { Prize } from '../../models/prize';
import { Order } from '../../models/order';
import { User } from '../../models/user';

@Component({
  selector: 'os-order',
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
  animations: [
    trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])]),
    trigger('flashing', [
      state('bright', style({ background: 'hsl(87.8,50.2%,62.7%)' })),
      state('dark', style({ background: 'hsl(87.8,50.2%,52.7%)' })),
      transition('bright <=> dark', [animate(350)])
    ])
  ]
})
export class OrderComponent implements OnDestroy, OnInit {
  changePrize = false;
  confirmDialogRef: MatDialogRef<ConfirmDialog>;
  confirmDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  currentYear = new Date().getFullYear();
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  flash: string;
  hideOrders: boolean;
  loaded$: Observable<boolean>;
  orders$: Observable<Order[]>;
  ordersLoaded$: Observable<boolean>;
  bankCheckId = '1468623188180';
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
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<fromStore.AppState>
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
      bankName: [
        { value: '', disabled: true },
        [Validators.pattern(RegexValues.nameValue), Validators.required]
      ],
      accountType: [{ value: 'Checking', disabled: true }],
      routingNumber: [
        { value: '', disabled: true },
        [Validators.pattern(RegexValues.bankNumbers), Validators.required]
      ],
      accountNumber: [
        { value: '', disabled: true },
        [Validators.pattern(RegexValues.bankNumbers), Validators.required]
      ]
    });
    this.loaded$ = store.pipe(select(fromStore.getUserLoaded));
    this.placing$ = store.pipe(select(fromStore.getOrderPlacing));
    store
      .pipe(select(fromStore.getPrizeLoaded), take(1), takeUntil(this.destroyed$))
      .subscribe(loaded => {
        if (loaded) this.store.dispatch(new prizeActions.GetPrizes());
      });
    this.selectPrizeForm = fb.group({ selectedPrize: null });
    this.settingPrize$ = store.pipe(select(fromStore.getUserSettingPrize));
    this.user$ = store.pipe(select(fromStore.getUserProfile));
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user;
      if (user && user.holdReason === 'Identification Hold - Suspicious Activity') {
        this.hideOrders = true;
        this.user = user;
      }
      this.f.patchValue(user);
      if (this.user.savedAccountNum) {
        this.f.get('useSavedBank').setValue(true);
      }
      this.store.dispatch(new prizeActions.SelectPrize(user.selectedPrize));
      this.prize$ = this.store.pipe(select(fromStore.getSelectedPrize));
      this.prizes$ = this.store.pipe(select(fromStore.getPrizeCollection));
      this.selectedPrizeLabels$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.name)));
      this.selectedPrizeValues$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.id)));
      this.selectedPrizeLabels$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(labels => (this.prizeLabels = labels));
      this.selectedPrizeValues$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(values => (this.prizeValues = values));
      this.prizes$
        .pipe(
          filter(prizes => prizes !== undefined && prizes.length > 0),
          takeUntil(this.destroyed$)
        )
        .subscribe(prizes => {
          let selectedPrize = this.selectPrizeForm.get('selectedPrize');
          let prizeIds = prizes.map(p => p.id);
          if (!selectedPrize.value && this.user.selectedPrize !== undefined) {
            if (
              this.user.selectedPrize !== undefined &&
              prizeIds.includes(this.user.selectedPrize)
            ) {
              selectedPrize.setValue(user.selectedPrize);
            } else if (this.user.selectedPrize === this.bankCheckId) {
              this.store.dispatch(new userActions.ChangeSelectedPrize(this.bankTransferId));
            } else {
              selectedPrize.setValue(prizes[0].id);
            }
            this.user.selectedPrize !== undefined
              ? selectedPrize.setValue(user.selectedPrize)
              : selectedPrize.setValue(prizes[0].id);
          }
        });
    });
    this.store.dispatch(new orderActions.GetOrders());
    this.orders$ = this.store.pipe(select(fromStore.getOrderCollection));
    this.ordersLoaded$ = this.store.pipe(select(fromStore.getOrderLoaded));
    this.orders$
      .pipe(
        filter(orders => Array.isArray(orders) && orders.length > 0),
        takeUntil(this.destroyed$)
      )
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
    let count = 0;
    setInterval(() => {
      if (count % 2 === 0) {
        this.flash = 'bright';
      } else {
        this.flash = 'dark';
      }
      count++;
    }, 350);
    typeof document !== 'undefined' && document.getElementById('os-toolbar')
      ? document.getElementById('os-toolbar').scrollIntoView()
      : {}; // tslint:disable-line
    if (
      this.paypalIds.includes(this.f.get('selectedPrize').value) &&
      (this.f.get('paypal').value == undefined ||
        this.f.get('paypal').value == '' ||
        this.f.get('paypal').value.paypal === ' ')
    ) {
      this.needPaypalEmail = true;
    } else {
      this.needPaypalEmail = false;
    }
    this.f.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fValue => {
      if (
        this.paypalIds.includes(this.f.get('selectedPrize').value) &&
        (fValue.paypal == undefined || fValue.paypal == '' || fValue.paypal === ' ')
      ) {
        this.needPaypalEmail = true;
      } else {
        this.needPaypalEmail = false;
      }
      if (
        fValue['selectedPrize'] &&
        this.prizeLabels[this.prizeValues.indexOf(fValue['selectedPrize'])] === 'Bank Transfer'
      ) {
        this.needBankInfo = true;
        if (!this.f.get('useSavedBank').value && this.f.get('bankName').disabled) {
          this.f.get('bankName').enable();
          this.f.get('accountType').enable();
          this.f.get('routingNumber').enable();
          this.f.get('accountNumber').enable();
        }
        if (this.f.get('useSavedBank').value && this.f.get('bankName').enabled) {
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
      this.store.dispatch(
        new userActions.ChangeSelectedPrize(this.selectPrizeForm.get('selectedPrize').value)
      );
      this.settingPrize$.pipe(filter(s => s !== false), takeUntil(this.destroyed$)).subscribe(() =>
        setTimeout(() => {
          this.changePrize = false;
        }, 50)
      );
    } else {
      this.changePrize = true;
    }
  }

  openConfirmDialog(formValue) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = `Are you sure <br><b>${
      formValue.paypal
    }</b><br> is your PayPal email address?`;
    this.confirmDialogRef.componentInstance.confirmColor = '#73a03d';
    this.confirmDialogRef.componentInstance.subtext = `If your paypal email address is incorrect,
      it may take you a long time to resolve the issue and get paid.
      You cannot switch payment methods after payment is sent.`;
    this.confirmDialogRef.componentInstance.subtextColor = '#F44336';

    if (this.confirmDialogRef) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(new orderActions.PlaceOrder(formValue));
          }
          this.confirmDialogRef = null;
        });
    }
  }

  openConfirmDialogInvalidPayPal() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = `Your paypal email address is invalid.`;
    this.confirmDialogRef.componentInstance.confirmColor = '#F44336';
    this.confirmDialogRef.componentInstance.subtext = `Please enter in a valid paypal email address`;
    this.confirmDialogRef.componentInstance.subtextColor = '#73a03d';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogConfig) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
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
      this.store.dispatch(new orderActions.PlaceOrder(f));
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
