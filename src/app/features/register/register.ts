/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CountryActions } from '../../actions/country';
import { PrizeActions } from '../../actions/prize';
import { UserActions } from '../../actions/user';
import { Prize } from '../../models/prize';
import { AppState } from '../../reducers';
import { getCountryLoaded } from '../../reducers/country';
import { getPrizeSelected, getPrizeCollection, getPrizeLoaded } from '../../reducers/prize';
import { getUserEntryEmail, getUserReferredBy } from '../../reducers/user';
import { CustomValidators, RegexValues, UsernameValidator } from '../../validators';

@Component({
  selector: 'os-register',
  providers: [UsernameValidator],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  countryLoaded$: Observable<boolean>;
  f: FormGroup;
  entryEmail$: Observable<string | null>;
  prizes$: Observable<Prize[]>;
  prizeIds$: Observable<(string | undefined)[]>;
  prizeNames$: Observable<(string | undefined)[]>;
  prizeLoaded$: Observable<boolean>;
  prizeLoaded: boolean;
  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);
  RANDOM_EMAIL = `new${this.RANDOM_NUM}@user.com`;
  referredBy$: Observable<string | null>;
  selectedPrize$: Observable<string | null>;
  selectedPrize: string | null;
  showPrizes: boolean;

  constructor(
    private countryActions: CountryActions,
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
      })
    this.f = new FormGroup({
      referredBy: new FormControl(),
      email: new FormControl(PUBLISH ? '' : `${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      confirmEmail: new FormControl(PUBLISH ? '' : `${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      username: new FormControl(PUBLISH ? '' : `myUserName${this.RANDOM_NUM}`,
        [Validators.required, Validators.pattern(RegexValues.username)],
        userValidator.usernameTaken),
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
      hidden: new FormControl(true),
      selectedPrize: new FormControl(),
    }, Validators.compose(
      [CustomValidators.compare('email', 'confirmEmail', 'compareEmail'),
      CustomValidators.compare('password', 'confirmPassword', 'comparePassword')]));

    this.prizeLoaded$ = this.store.let(getPrizeLoaded());
    this.prizeLoaded$
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        this.prizeLoaded = loaded;
      });
  }

  ngOnInit() {
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
    this.selectedPrize$ = this.store.let(getPrizeSelected());
    this.selectedPrize$
      .takeUntil(this.destroyed$)
      .subscribe(prize => {
        if (prize === null) {
          if (!this.prizeLoaded) this.store.dispatch(this.prizeActions.getPrizes());
          this.prizes$ = this.store.let(getPrizeCollection());
          this.prizes$
            .takeUntil(this.destroyed$)
            .subscribe(prizes => {
              if (prizes[0]) {
                this.showPrizes = true;
                setTimeout(() => {
                  this.f.get('selectedPrize').setValue(prizes[0].id);
                }, 1);
              }
            });
          this.prizeIds$ = this.store.let(getPrizeCollection())
            .filter(arr => arr.length > 0)
            .map((arr: Prize[]) => arr.map((item: Prize) => item.id));
          this.prizeNames$ = this.store.let(getPrizeCollection())
            .filter(arr => arr.length > 0)
            .map((arr: Prize[]) => arr.map((item: Prize) => item.name));
        }
        this.f.get('selectedPrize').setValue(prize);
      });
  }

  submitForm() {
    this.store.dispatch(this.userActions.register(this.f.value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
