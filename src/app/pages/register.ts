import {Component} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../reducers';
import { UserActions } from '../actions';

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
        <input formControlName="password" class="form-control">
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input formControlName="confirmPassword" class="form-control">
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
    <button type="submit">Register</button>
    </form>
    <br>
    <pre>{{f.value | json  }}</pre>
  </main>
  
  `
})

export class Register {

  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);

  email = new FormControl(`new${this.RANDOM_NUM}@user.com`);
  confirmEmail = new FormControl(`new${this.RANDOM_NUM}@user.com`);
  username = new FormControl(`myUserName${this.RANDOM_NUM}`);
  password = new FormControl('password');
  confirmPassword = new FormControl('password');
  firstName = new FormControl('First Name');
  lastName = new FormControl('Last Name');
  address = new FormControl('123 Street');
  city = new FormControl('myCity');
  State = new FormControl('Nevada');
  zipCode = new FormControl('12345');
  country = new FormControl('USA');
  phone = new FormControl('305-837-2832');
  birthday = new FormControl('01/01/1999');
  paypal = new FormControl('new@user.com');
  agree = new FormControl(true)

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

  constructor(private store: Store<AppState>, private userActions: UserActions) { }



  onSubmit() {
    this.store.dispatch(this.userActions.register(this.f.value));
  }
}