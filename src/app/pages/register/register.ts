/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { PrizeActions, UserActions } from '../../actions';
import { INPUT_FIELDS } from '../../components';
import { Prize } from '../../models';
import {
  AppState, getUserEntryEmail, getUserReferredBy,
  getPrizeSelected, getPrizeCollection, getPrizeLoaded
} from '../../reducers';
import {
  CustomValidators, DebounceInputControlValueAccessor,
  RegexValues, UsernameValidator
} from '../../validators';

@Component({
  selector: 'register',
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    DebounceInputControlValueAccessor,
    INPUT_FIELDS
  ],
  providers: [UsernameValidator],
  template: require('./register.html')
})

export class Register implements OnDestroy, OnInit {
  f: FormGroup;
  entryEmail$: Observable<string | null>;
  entryEmailSub: Subscription;
  prizes$: Observable<Prize[]>;
  prizesSub: Subscription;
  prizeIds$: Observable<(string | undefined)[]>;
  prizeNames$: Observable<(string | undefined)[]>;
  prizeLoaded$: Observable<boolean>;
  prizeLoaded: boolean;
  prizeLoadedSub: Subscription;
  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);
  RANDOM_EMAIL = `new${this.RANDOM_NUM}@user.com`;
  referredBy$: Observable<string | null>;
  referredBySub: Subscription;
  selectedPrize$: Observable<string | null>;
  selectedPrize: string | null;
  selectedPrizeSub: Subscription;
  showPrizes: boolean;

  constructor(
    private prizeActions: PrizeActions,
    private store: Store<AppState>,
    private userActions: UserActions,
    private userValidator: UsernameValidator
  ) {

    this.f = new FormGroup({
      referredBy: new FormControl(),
      email: new FormControl(`${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      confirmEmail: new FormControl(`${this.RANDOM_EMAIL}`,
        [Validators.required, Validators.pattern(RegexValues.email)]),
      username: new FormControl(`myUserName${this.RANDOM_NUM}`,
        [Validators.required, Validators.pattern(RegexValues.username)],
        userValidator.usernameTaken),
      password: new FormControl('password',
        [Validators.required, Validators.pattern(RegexValues.password)]),
      confirmPassword: new FormControl('password',
        [Validators.required, Validators.pattern(RegexValues.password)]),
      firstName: new FormControl('First Name',
        [Validators.required, Validators.pattern(RegexValues.nameValue)]),
      lastName: new FormControl('Last Name',
        [Validators.required, Validators.pattern(RegexValues.nameValue)]),
      address: new FormControl('123 Street',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      city: new FormControl('myCity',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      State: new FormControl('Nevada',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      zipCode: new FormControl('12345',
        [Validators.required, Validators.pattern(RegexValues.zipCode)]),
      country: new FormControl('USA',
        [Validators.required, Validators.pattern(RegexValues.address)]),
      phone: new FormControl('305-837-2832',
        [Validators.required, Validators.pattern(RegexValues.phone)]),
      birthday: new FormControl('1999-01-01', Validators.required),
      paypal: new FormControl('new@user.com',
        Validators.pattern(RegexValues.email)),
      agree: new FormControl(true, CustomValidators.isTrue),
      hidden: new FormControl(true),
      selectedPrize: new FormControl(),
    }, {}, Validators.compose(
      [CustomValidators.compare('email', 'confirmEmail', 'compareEmail'),
      CustomValidators.compare('password', 'confirmPassword', 'comparePassword')]));

    this.prizeLoaded$ = this.store.let(getPrizeLoaded());
    this.prizeLoadedSub = this.prizeLoaded$.subscribe(loaded => {
      this.prizeLoaded = loaded;
    });

  }

  ngOnInit() {
    this.entryEmail$ = this.store.let(getUserEntryEmail());
    this.entryEmailSub = this.entryEmail$.take(1).subscribe(email => {
      if (email) this.f.controls['email'].updateValue(email);
    });
    this.referredBy$ = this.store.let(getUserReferredBy());
    this.referredBySub = this.referredBy$
      .filter(ref => ref !== null)
      .subscribe(ref => {
        this.f.controls['referredBy'].updateValue(ref);
      });
    this.selectedPrize$ = this.store.let(getPrizeSelected());
    this.selectedPrizeSub = this.selectedPrize$
      .subscribe(prize => {
        if (prize === null) {
          if (!this.prizeLoaded) this.store.dispatch(this.prizeActions.getPrizes());
          this.prizes$ = this.store.let(getPrizeCollection());
          this.prizesSub = this.prizes$
            .subscribe(prizes => {
              if (prizes[0]) {
                this.showPrizes = true;
                console.log('Hello!');
                console.log(prizes[0].id);
                setTimeout(() => {
                  this.f.controls['selectedPrize'].updateValue(prizes[0].id);
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
        this.f.controls['selectedPrize'].updateValue(prize);
      });
  }

  submitForm() {
    this.store.dispatch(this.userActions.register(this.f.value));
  }

  ngOnDestroy() {
    this.entryEmailSub.unsubscribe();
    this.referredBySub.unsubscribe();
    if (this.prizesSub) this.prizesSub.unsubscribe();
    this.selectedPrizeSub.unsubscribe();
  }
}
