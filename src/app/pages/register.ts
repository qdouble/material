import {Component} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getUserEntryEmail } from '../reducers';
import { UserActions } from '../actions';
import { CustomValidators, RegexValues } from '../validators';

@Component({
  selector: 'register',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Registration</h1>
  </header>
  <main>
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>E-Mail Address</label>
        <input formControlName="email" class="form-control">
      </div>
      <div class="form-group">
        <label>Confirm E-mail Address</label>
        <input formControlName="confirmEmail" class="form-control">
      </div>
      <div class="form-group">
        <label>Username</label>
        <input formControlName="username" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input formControlName="password" type="password" class="form-control">
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input formControlName="confirmPassword" type="password" class="form-control">
      </div>
      <div class="form-group">
        <label>First Name</label>
        <input formControlName="firstName" class="form-control">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input formControlName="lastName" class="form-control">
      </div>
      <div class="form-group">
        <label>Street Address</label>
        <input formControlName="address" class="form-control">
      </div>
      <div class="form-group">
        <label>City</label>
        <input formControlName="city" class="form-control">
      </div>
      <div class="form-group">
        <label>State</label>
        <input formControlName="State" class="form-control">
      </div>
      <div class="form-group">
        <label>ZipCode</label>
        <input formControlName="zipCode" class="form-control">
      </div>
      <div class="form-group">
        <label>Country</label>
        <input formControlName="country" class="form-control">
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input formControlName="phone" class="form-control">
      </div>
      <div class="form-group">
        <label>Birthday</label>
        <input type="date" formControlName="birthday" class="form-control">
      </div>
      <div class="form-group">
        <label>PayPal</label>
        <input formControlName="paypal" class="form-control">
      </div>
      <div class="form-group">
        <label>I agree to the Terms and Conditions</label>
        <input formControlName="agree" type="checkbox" class="form-control">
      </div>
    <button type="submit" [disabled]="!f.valid">Register</button>
    </form>
  </main>
  
  `
})

export class Register {
  entryEmail$: Observable<string>;
  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);

  email = new FormControl(`new${this.RANDOM_NUM}@user.com`,
    [Validators.required, Validators.pattern(RegexValues.email)]);
  confirmEmail = new FormControl(`new${this.RANDOM_NUM}@user.com`,
    [Validators.required, Validators.pattern(RegexValues.email)]);
  username = new FormControl(`myUserName${this.RANDOM_NUM}`,
    [Validators.required, Validators.pattern(RegexValues.username)]);
  password = new FormControl('password',
    [Validators.required, Validators.pattern(RegexValues.password)]);
  confirmPassword = new FormControl('password',
    [Validators.required, Validators.pattern(RegexValues.password)]);
  firstName = new FormControl('First Name',
    [Validators.required, Validators.pattern(RegexValues.nameValue)]);
  lastName = new FormControl('Last Name',
    [Validators.required, Validators.pattern(RegexValues.nameValue)]);
  address = new FormControl('123 Street',
    [Validators.required, Validators.pattern(RegexValues.address)]);
  city = new FormControl('myCity',
    [Validators.required, Validators.pattern(RegexValues.address)]);
  State = new FormControl('Nevada',
    [Validators.required, Validators.pattern(RegexValues.address)]);
  zipCode = new FormControl('12345',
    [Validators.required, Validators.pattern(RegexValues.zipCode)]);
  country = new FormControl('USA',
    [Validators.required, Validators.pattern(RegexValues.address)]);
  phone = new FormControl('305-837-2832',
    [Validators.required, Validators.pattern(RegexValues.phone)]);
  birthday = new FormControl('1999-01-01', Validators.required);
  paypal = new FormControl('new@user.com',
    Validators.pattern(RegexValues.email));
  agree = new FormControl(null, CustomValidators.isTrue)

  f = new FormGroup({
    email: this.email,
    confirmEmail: this.confirmEmail,
    username: this.username,
    password: this.password,
    confirmPassword: this.confirmPassword,
    firstName: this.firstName,
    lastName: this.lastName,
    address: this.address,
    city: this.city,
    State: this.State,
    zipCode: this.zipCode,
    country: this.country,
    phone: this.phone,
    birthday: this.birthday,
    paypal: this.paypal,
    agree: this.agree
  })

  constructor(private store: Store<AppState>, private userActions: UserActions) {
    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.email.updateValue(email)
    });
  }

  onSubmit() {
    this.store.dispatch(this.userActions.register(this.f.value));
  }
}