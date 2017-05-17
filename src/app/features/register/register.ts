/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CountryActions } from '../../actions/country';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { Country } from '../../models/country';
import { Prize } from '../../models/prize';
import { AppState } from '../../reducers';
import { getCountryCollection, getCountryLoaded } from '../../reducers/country';
import { getPrizeSelected, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getUserEntryEmail, getUserReferredBy } from '../../reducers/user';
import { CustomValidators, RegexValues, UsernameValidator } from '../../validators';

import { IPMatchFoundDialog } from './ip-match-found.dialog';

@Component({
  selector: 'os-register',
  providers: [UsernameValidator],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class Register implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  dialogRef: MdDialogRef<IPMatchFoundDialog>;
  config: MdDialogConfig = {
    disableClose: false,
    width: '90%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  countries$: Observable<Country[]>;
  countryIds$: Observable<(string | undefined)[]>;
  countryNames$: Observable<(string | undefined)[]>;
  countryLoaded$: Observable<boolean>;
  f: FormGroup;
  entryEmail$: Observable<string | null>;
  matches$: Observable<boolean>;
  prizes$: Observable<Prize[]>;
  prizeIds$: Observable<(string | undefined)[]>;
  prizeNames$: Observable<(string | undefined)[]>;
  prizeLoaded$: Observable<boolean>;
  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);
  RANDOM_EMAIL = `new${this.RANDOM_NUM}@user.com`;
  referredBy$: Observable<string | null>;
  selectedPrize$: Observable<string | null>;
  selectedPrize: string | null;
  showPrizes: boolean;

  constructor(
    private countryActions: CountryActions,
    public dialog: MdDialog,
    private prizeActions: PrizeActions,
    private store: Store<AppState>,
    private userActions: UserActions,
    private userValidator: UsernameValidator
  ) {
    this.countryLoaded$ = store.let(getCountryLoaded());
    this.countryLoaded$
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (!loaded) this.store.dispatch(this.countryActions.getCountries());
      });
    this.f = new FormGroup({
      referredBy: new FormControl(),
      email: new FormControl(PUBLISH ? '' : `${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      confirmEmail: new FormControl(PUBLISH ? '' : `${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      username: new FormControl(PUBLISH ? '' : `myUserName${this.RANDOM_NUM}`,
        [Validators.required, Validators.pattern(RegexValues.username)],
        <any>userValidator.usernameTaken),
      password: new FormControl(PUBLISH ? '' : 'password',
        [Validators.required, Validators.pattern(RegexValues.password)]),
      confirmPassword: new FormControl(PUBLISH ? '' : 'password',
        [Validators.required, Validators.pattern(RegexValues.password)]),
      firstName: new FormControl(PUBLISH ? '' : 'John',
        [Validators.required, Validators.pattern(RegexValues.nameValue)]),
      lastName: new FormControl(PUBLISH ? '' : 'Doe',
        [Validators.required, Validators.pattern(RegexValues.nameValue)]),
      address: new FormControl(PUBLISH ? '' : '123 Street',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      city: new FormControl(PUBLISH ? '' : 'myCity',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      State: new FormControl(PUBLISH ? '' : 'Nevada',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      zipCode: new FormControl(PUBLISH ? '' : '12345',
        [Validators.required, Validators.pattern(RegexValues.zipCode)]),
      country: new FormControl(PUBLISH ? '' : 'USA',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      phone: new FormControl(PUBLISH ? '' : '305-837-2832',
        [Validators.required, Validators.pattern(RegexValues.phone)]),
      birthday: new FormControl(PUBLISH ? '' : '1999-01-01', Validators.required),
      paypal: new FormControl(PUBLISH ? '' : 'new@user.com',
        Validators.pattern(RegexValues.email)),
      agree: new FormControl(PUBLISH ? null : true, CustomValidators.isTrue),
      agree2: new FormControl(PUBLISH ? null : true, CustomValidators.isTrue),
      hidden: new FormControl(true),
      selectedPrize: new FormControl(null),
    }, Validators.compose(
      [CustomValidators.compare('email', 'confirmEmail', 'compareEmail'),
      CustomValidators.compare('password', 'confirmPassword', 'comparePassword')]));

    this.prizeLoaded$ = store.let(getPrizeLoaded());
    this.prizeLoaded$
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(this.prizeActions.getPrizes());
        }
      });

    this.countryLoaded$ = store.let(getCountryLoaded());
    this.countryLoaded$
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(this.countryActions.getCountries());
        }
      });
  }

  ngOnInit() {
    this.countries$ = this.store.let(getCountryCollection());
    this.countryIds$ = this.countries$.map(countries => countries.map(country => country.id));
    this.countryIds$
      .filter(ids => ids.length > 0)
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(ids => this.f.get('country').setValue(ids[0]));
    this.countryNames$ = this.countries$
      .map(countries => countries.map(country => country.displayName));
    this.entryEmail$ = this.store.let(getUserEntryEmail());
    this.entryEmail$
      .takeUntil(this.destroyed$)
      .take(1)
      .subscribe(email => {
        if (email) this.f.get('email').setValue(email);
      });
    this.referredBy$ = this.store.let(getUserReferredBy());
    this.referredBy$
      .takeUntil(this.destroyed$)
      .filter(ref => ref !== null)
      .subscribe(ref => {
        this.f.get('referredBy').setValue(ref);
      });

    this.prizes$ = this.store.let(getPrizeCollection());
    this.prizeIds$ = this.prizes$.map(prizes => prizes.map(prize => prize.id));
    this.prizeNames$ = this.prizes$.map(prizes => prizes.map(prize => prize.name));
    this.selectedPrize$ = this.store.let(getPrizeSelected());
    this.selectedPrize$
      .takeUntil(this.destroyed$)
      .subscribe(id => {
        if (id === null) this.showPrizes = true;
      });
    this.prizeIds$
      .filter(ids => ids.length > 0)
      .takeUntil(this.destroyed$)
      .subscribe(ids => {
        if (this.f.get('selectedPrize').value === null) {
          this.f.patchValue({ selectedPrize: ids[0] });
        }
      });

    this.selectedPrize$
      .filter(id => id !== null)
      .takeUntil(this.destroyed$)
      .subscribe(id => this.f.patchValue({ selectedPrize: id }));
  }

  open() {
    this.dialogRef = this.dialog.open(IPMatchFoundDialog, this.config);

    this.dialogRef.afterClosed().subscribe(proceed => {
      if (proceed) {
        this.store.dispatch(this.userActions.register(this.f.value));
      }
      this.dialogRef = null;
    });
  }

  submitForm() {
    let matches$ = this.store.select(s => s.user.matches);
    matches$
      .filter(m => m !== undefined)
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(match => {
        if (match) {
          this.open();
        } else {
          this.store.dispatch(this.userActions.register(this.f.value));
        }
      });
      this.store.dispatch(this.userActions.checkIPMatch());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
