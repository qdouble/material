import {Component} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getUserEntryEmail } from '../reducers';
import { UserActions } from '../actions';
import { CustomValidators, DebounceInputControlValueAccessor,
  RegexValues, UsernameValidator } from '../validators';
import { INPUT_FIELDS } from '../components';

@Component({
  selector: 'register',
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    DebounceInputControlValueAccessor,
    INPUT_FIELDS
  ],
  providers: [UsernameValidator],
  template: `
  
  <header>
    <h1>Registration</h1>
  </header>
  <main>
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
      <email-input [label]="'Email Address'" [controlName]="'email'" [form]="f"></email-input>
      <email-input [label]="'Confirm E-mail Address'" [controlName]="'confirmEmail'" [form]="f"></email-input>
      <div [hidden]="!f.errors?.compareEmail || confirmEmail.pristine" class="alert alert-danger">
        Email addresses do not match.
      </div>
      <debounce-input [label]="'Username'" [controlName]="'username'" [form]="f"></debounce-input>
      <password-input [label]="'Password'" [controlName]="'password'" [form]="f"></password-input>
      <password-input [label]="'Confirm Password'" [controlName]="'confirmPassword'" [form]="f"></password-input>
      <div [hidden]="!f.errors?.comparePassword || confirmPassword.pristine" class="alert alert-danger">
        Passwords do not match.
      </div>
      <text-input [label]="'First Name'" [controlName]="'firstName'" [form]="f"></text-input>
      <text-input [label]="'Last Name'" [controlName]="'lastName'" [form]="f"></text-input>
      <text-input [label]="'Street Address'" [controlName]="'address'" [form]="f"></text-input>
      <text-input [label]="'City'" [controlName]="'city'" [form]="f"></text-input>
      <text-input [label]="'State'" [controlName]="'State'" [form]="f"></text-input>
      <text-input [label]="'Zip Code'" [controlName]="'zipCode'" [form]="f"></text-input>
      <text-input [label]="'Country'" [controlName]="'country'" [form]="f"></text-input>
      <text-input [label]="'Phone Number'" [controlName]="'phone'" [form]="f"></text-input>
      <div class="form-group">
        <label>Birthday</label>
        <input type="date" formControlName="birthday" class="form-control">
      </div>
      <email-input [label]="'PayPal email address'" [controlName]="'paypal'" [form]="f"></email-input>
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
  f: FormGroup;
  username: FormControl;
  entryEmail$: Observable<string>;
  RANDOM_NUM = Math.floor((Math.random() * 100000) + 1);

  email = new FormControl(`new${this.RANDOM_NUM}@user.com`,
    [Validators.required, Validators.pattern(RegexValues.email)]);
  confirmEmail = new FormControl(`new${this.RANDOM_NUM}@user.com`,
    [Validators.required, Validators.pattern(RegexValues.email)]);
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
  agree = new FormControl(true, CustomValidators.isTrue)

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private userValidator: UsernameValidator
  ) {

    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.email.updateValue(email)
    });

    this.username = new FormControl(`myUserName${this.RANDOM_NUM}`,
      [Validators.required, Validators.pattern(RegexValues.username)],
      userValidator.usernameTaken);

    this.f = new FormGroup({
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
      agree: this.agree,
      hidden: new FormControl(true)
    }, {}, Validators.compose(
      [CustomValidators.compare('email', 'confirmEmail', 'compareEmail'),
        CustomValidators.compare('password', 'confirmPassword', 'comparePassword')]))
  }

  onSubmit() {
    this.store.dispatch(this.userActions.register(this.f.value));
  }

}