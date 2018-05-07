/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as fromStore from '../../reducers';
import * as countryActions from '../../actions/country';
import * as offerActions from '../../actions/offer';
import * as userActions from '../../actions/user';
import { Country } from '../../models/country';
import { User } from '../../models/user';
import { CustomValidators, RegexValues } from '../../validators';

@Component({
  selector: 'os-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class Profile implements OnDestroy, OnInit {
  countries$: Observable<Country[]>;
  countryIds$: Observable<(string | undefined)[]>;
  countryNames$: Observable<(string | undefined)[]>;
  countryLoaded$: Observable<boolean>;
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  hideProfile: boolean;
  initialFormValue: User;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  pendingProfile: User;
  previousEmailValue: string;
  previousUserCountry: string;
  user: User;
  user$: Observable<User>;
  viewPending: false;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.AppState>
  ) {
    this.f = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      lastName: ['', [Validators.required, Validators.pattern(RegexValues.nameValue)]],
      username: ['', [Validators.required, Validators.pattern(RegexValues.username)]],
      email: ['', [Validators.required, Validators.pattern(RegexValues.email)]],
      confirmEmail: ['', [Validators.pattern(RegexValues.email)]],
      password2: ['', [Validators.pattern(RegexValues.changePassword)]],
      confirmPassword: ['', [Validators.pattern(RegexValues.changePassword)]],
      address: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      city: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      State: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      zipCode: ['', [Validators.required, Validators.pattern(RegexValues.zipCode)]],
      country: ['', [Validators.required, Validators.pattern(RegexValues.address)]],
      phone: ['', [Validators.required, Validators.pattern(RegexValues.phone)]],
      paypal: ['', [Validators.pattern(RegexValues.email)]],
      birthday: ['', [Validators.required]],
      receiveEmailNotifications: true,
      receiveUpdateNotifications: true,
      receiveAdminMessages: true,
      receiveSponsorMessages: true,
      receiveReferralMessages: true,
      optOutOfMassEmails: false
    }, {
        validator: Validators.compose([
          CustomValidators.compare('email', 'confirmEmail', 'compareEmail'),
          CustomValidators.compare('password2', 'confirmPassword', 'comparePassword')
        ])
      });
  }

  ngOnInit() {
    this.countryLoaded$ = this.store.pipe(select(fromStore.getCountryLoaded));
    this.countryLoaded$
      .takeUntil(this.destroyed$)
      .subscribe(loaded => {
        if (!loaded) this.store.dispatch(new countryActions.GetCountries());
      });
    this.user$ = this.store.pipe(select(fromStore.getUserProfile));
    this.user$.take(1).subscribe(u => {
      if (u && u.profilePending) {
        this.store.dispatch(new userActions.GetProfile());
      }
    });
    this.loaded$ = this.store.pipe(select(fromStore.getUserLoaded));
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
    this.countries$ = this.store.pipe(select(fromStore.getCountryCollection));
    this.countryIds$ = this.countries$.map(countries => countries.map(country => country.id));
    this.countryNames$ = this.countries$
      .map(countries => countries.map(country => country.displayName));
    this.user$
      .filter(user => user !== undefined)
      .takeUntil(this.destroyed$)
      .subscribe((user: User) => {
        if (user.profilePending) {
          this.pendingProfile = user.pendingProfile;
        }
        if (user.holdReason === 'Identification Hold - Suspicious Activity') {
          this.hideProfile = true;
          this.user = user;
        }
        let loadedUser = Object.assign({}, user, {
          birthday: (user.birthday || '').substring(0, 10),
          confirmEmail: user.email
        });
        this.f.patchValue(loadedUser);
        if (this.previousUserCountry && user.country !== this.previousUserCountry) {
          this.store.dispatch(new offerActions.GetOffers());
        }
        this.initialFormValue = this.f.value;
        this.previousEmailValue = user.email;
        this.previousUserCountry = user.country;
      });

    this.f.get('email').valueChanges
      .takeUntil(this.destroyed$)
      .subscribe(value => {
        if (value === this.initialFormValue.email) {
          this.f.get('confirmEmail').setValue(value);
          this.previousEmailValue = value;
        } else {
          if (this.previousEmailValue === this.initialFormValue.email) {
            this.f.get('confirmEmail').setValue('');
          }
          this.previousEmailValue = value;
        }
      });
  }

  dismissProfileChanges() {
    this.store.dispatch(new userActions.DismissProfileChanges());
  }

  submitForm() {
    let f: User = this.f.value;
    let i: User = this.initialFormValue;
    let requiresApproval = false;
    if (f.firstName !== i.firstName || f.lastName !== i.lastName || f.username !== i.username
      || f.email !== i.email) {
      requiresApproval = true;
    }
    this.store.dispatch(new userActions.UpdateProfile({
      ...this.f.value,
      requiresApproval: requiresApproval,
      password: this.f.value.password2
    }));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
