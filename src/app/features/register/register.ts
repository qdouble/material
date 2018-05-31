/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as countryActions from '../../actions/country';
import * as prizeActions from '../../actions/prize';
import * as userActions from '../../actions/user';
import { Country } from '../../models/country';
import { IP } from '../../models/ip';
import { Prize } from '../../models/prize';
import * as fromStore from '../../reducers';
import { CustomValidators, RegexValues, UsernameValidator } from '../../validators';

import { IPMatchFoundDialog } from './ip-match-found.dialog';
import { GetIPInfoResponse } from '../../models/ui';
import { takeUntil, filter, take, map } from 'rxjs/operators';

@Component({
  selector: 'os-register',
  providers: [UsernameValidator],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class Register implements OnDestroy, OnInit {
  blocked: true;
  config: MatDialogConfig = {
    disableClose: false
  };
  countries$: Observable<Country[]>;
  countryIds$: Observable<(string | undefined)[]>;
  countryNames$: Observable<(string | undefined)[]>;
  countryLoaded$: Observable<boolean>;
  destroyed$: Subject<any> = new Subject<any>();
  dialogRef: MatDialogRef<IPMatchFoundDialog>;
  f: FormGroup;
  flash: string;
  entryEmail$: Observable<string | null>;
  invalidCountry: boolean;
  invalidCountry$: Observable<boolean>;
  ip$: Observable<string>;
  ipJson$: Observable<IP>;
  ipInfo: GetIPInfoResponse;
  ipInfo$: Observable<GetIPInfoResponse>;
  loading$: Observable<boolean>;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDate();
  minDate = new Date(this.year - 130, this.month, this.day);
  maxDate = new Date(this.year - 16, this.month, this.day);
  overrideInvalid$: Observable<string>;
  prizes$: Observable<Prize[]>;
  prizeIds$: Observable<(string | undefined)[]>;
  prizeNames$: Observable<(string | undefined)[]>;
  prizeLoaded$: Observable<boolean>;
  RANDOM_NUM = Math.floor(Math.random() * 1000000 + 1);
  RANDOM_EMAIL = `mockUser${this.RANDOM_NUM}@gmail.com`;
  referredBy$: Observable<string | null>;
  selectedPrize$: Observable<string | null>;
  selectedPrize: string | null;
  showPrizes: boolean;
  step = 1;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<fromStore.AppState>,
    private userValidator: UsernameValidator
  ) {
    this.f = new FormGroup(
      {
        referredBy: new FormControl(),
        email: new FormControl(PUBLISH ? '' : `${this.RANDOM_EMAIL}`, [
          Validators.required,
          Validators.pattern(RegexValues.email)
        ]),
        username: new FormControl(
          PUBLISH ? '' : `myUserName${this.RANDOM_NUM}`,
          [Validators.required, Validators.pattern(RegexValues.username)],
          <any>this.userValidator.usernameTaken
        ),
        password: new FormControl(PUBLISH ? '' : 'password', [
          Validators.required,
          Validators.pattern(RegexValues.password)
        ]),
        confirmPassword: new FormControl(PUBLISH ? '' : 'password', [
          Validators.required,
          Validators.pattern(RegexValues.password)
        ]),
        firstName: new FormControl(PUBLISH ? '' : 'John', [
          Validators.required,
          Validators.pattern(RegexValues.nameValue)
        ]),
        lastName: new FormControl(PUBLISH ? '' : 'Doe', [
          Validators.required,
          Validators.pattern(RegexValues.nameValue)
        ]),
        address: new FormControl(PUBLISH ? '' : '123 Street', [
          Validators.required,
          Validators.pattern(RegexValues.address)
        ]),
        city: new FormControl(PUBLISH ? '' : 'myCity', [
          Validators.required,
          Validators.pattern(RegexValues.address)
        ]),
        State: new FormControl(PUBLISH ? '' : 'Nevada', [
          Validators.required,
          Validators.pattern(RegexValues.address)
        ]),
        zipCode: new FormControl(PUBLISH ? '' : '12345', [
          Validators.required,
          Validators.pattern(RegexValues.zipCode)
        ]),
        country: new FormControl(PUBLISH ? '' : 'USA', [
          Validators.required,
          Validators.pattern(RegexValues.address)
        ]),
        phone: new FormControl(PUBLISH ? '' : '305-837-2832', [
          Validators.required,
          Validators.pattern(RegexValues.phone)
        ]),
        birthday: new FormControl(PUBLISH ? '' : '1999-01-01', Validators.required),
        paypal: new FormControl(
          PUBLISH ? '' : `new${this.RANDOM_NUM}@user.com`,
          Validators.pattern(RegexValues.email)
        ),
        agree: new FormControl(PUBLISH ? null : true, CustomValidators.isTrue),
        agree2: new FormControl(PUBLISH ? null : true, CustomValidators.isTrue),
        agree3: new FormControl(PUBLISH ? null : true, CustomValidators.isTrue),
        hidden: new FormControl(true),
        selectedPrize: new FormControl(null)
      },
      Validators.compose([
        CustomValidators.compare('password', 'confirmPassword', 'comparePassword')
      ])
    );
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getUserLoading));
    this.invalidCountry$ = this.store.pipe(select(fromStore.getUIInvalidCountry));
    this.overrideInvalid$ = this.store.pipe(select(fromStore.getUIOverrideInvalidIp));
    this.invalidCountry$.pipe(takeUntil(this.destroyed$)).subscribe(invalid => {
      if (invalid) {
        this.overrideInvalid$
          .pipe(takeUntil(this.destroyed$), filter(o => o === ''))
          .subscribe(() => (this.invalidCountry = true));
      }
    });
    this.ipInfo$ = this.store.pipe(select(fromStore.getUIIPInfo));
    this.ipInfo$.pipe(takeUntil(this.destroyed$)).subscribe(i => (this.ipInfo = i));
    this.countryLoaded$ = this.store.pipe(select(fromStore.getCountryLoaded));
    this.countryLoaded$.pipe(takeUntil(this.destroyed$)).subscribe(loaded => {
      if (!loaded) this.store.dispatch(new countryActions.GetCountries());
    });
    this.prizeLoaded$ = this.store.pipe(select(fromStore.getPrizeLoaded));
    this.prizeLoaded$.pipe(takeUntil(this.destroyed$)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new prizeActions.GetPrizes());
      }
    });
    this.countryLoaded$ = this.store.pipe(select(fromStore.getCountryLoaded));
    this.countryLoaded$.pipe(takeUntil(this.destroyed$)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new countryActions.GetCountries());
      }
    });
    this.store
      .pipe(select(fromStore.getUserReferrerBlocked), takeUntil(this.destroyed$))
      .subscribe(blocked => {
        if (blocked) {
          this.blocked = true;
        }
      });
    this.countries$ = this.store.pipe(select(fromStore.getCountryCollection));
    this.countryIds$ = this.countries$.pipe(map(countries => countries.map(country => country.id)));
    this.countryIds$
      .pipe(filter(ids => ids.length > 0), take(1), takeUntil(this.destroyed$))
      .subscribe(ids => this.f.get('country').setValue(ids[0]));
    this.countryNames$ = this.countries$.pipe(
      map(countries => countries.map(country => country.displayName))
    );
    this.entryEmail$ = this.store.pipe(select(fromStore.getUserEntryEmail));
    this.entryEmail$.pipe(takeUntil(this.destroyed$), take(1)).subscribe(email => {
      if (email) this.f.get('email').setValue(email);
    });

    this.ip$ = this.store.select(s => s.user.ip);
    this.ipJson$ = this.store.select(s => s.user.ipJson);
    this.referredBy$ = this.store.pipe(select(fromStore.getUserReferredBy));
    this.referredBy$
      .pipe(takeUntil(this.destroyed$), filter(ref => ref !== null))
      .subscribe(ref => {
        this.f.get('referredBy').setValue(ref);
      });

    this.prizes$ = this.store.pipe(select(fromStore.getPrizeCollection));
    this.prizeIds$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.id)));
    this.prizeNames$ = this.prizes$.pipe(map(prizes => prizes.map(prize => prize.name)));
    this.route.queryParams.forEach(param => {
      if (param.email) {
        this.f.get('email').patchValue(param.email);
        this.f.get('confirmEmail').patchValue(param.email);
      }
      if (param.firstName) {
        this.f.get('firstName').patchValue(param.firstName);
      }
      if (param.lastName) {
        this.f.get('lastName').patchValue(param.lastName);
      }
      if (param.phone) {
        this.f.get('phone').patchValue(param.phone);
      }
    });
    this.selectedPrize$ = this.store.pipe(select(fromStore.getSelectedPrizeId));
    this.selectedPrize$.pipe(takeUntil(this.destroyed$)).subscribe(id => {
      if (id === null) this.showPrizes = true;
    });
    this.prizeIds$
      .pipe(filter(ids => ids.length > 0), takeUntil(this.destroyed$))
      .subscribe(ids => {
        this.store.dispatch(new prizeActions.SelectPrize(ids[0]));
        if (this.f.get('selectedPrize').value === null) {
          this.f.patchValue({ selectedPrize: ids[0] });
        }
      });

    this.selectedPrize$
      .pipe(filter(id => id !== null), takeUntil(this.destroyed$))
      .subscribe(id => this.f.patchValue({ selectedPrize: id }));
  }

  openIPMatchDialog() {
    this.dialogRef = this.dialog.open(IPMatchFoundDialog, this.config);
    this.ip$.pipe(take(1)).subscribe(ip => {
      this.dialogRef.componentInstance.ip = ip;
    });
    this.ipJson$.pipe(take(1)).subscribe(ip => {
      if (ip) {
        this.dialogRef.componentInstance.ISP = ip.org;
      }
    });
    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe(proceed => {
        if (proceed) {
          this.store.dispatch(new userActions.Register(this.f.value));
        }
        this.dialogRef = null;
      });
    }
  }

  submitForm() {
    let matches$ = this.store.select(s => s.user.matches);
    matches$
      .pipe(filter(m => m !== undefined), take(1), takeUntil(this.destroyed$))
      .subscribe(match => {
        if (match) {
          this.openIPMatchDialog();
        } else {
          this.store.dispatch(
            new userActions.Register({
              ...this.f.value,
              ipInfo: this.ipInfo
            })
          );
        }
      });
    this.store.dispatch(new userActions.CheckIPMatch(this.f.get('referredBy').value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
