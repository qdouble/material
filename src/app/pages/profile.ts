import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';
import { AppState, getUser, getUserLoaded, getUserLoading } from '../reducers';
import { UserActions } from '../actions';
import { ProfileForm } from '../components/profile-form';
import { RegexValues } from '../validators';
import { INPUT_FIELDS } from '../components';

@Component({
  selector: 'profile',
  directives: [REACTIVE_FORM_DIRECTIVES, INPUT_FIELDS],
  template: `

    <header>
      <h1>Profile</h1>
    </header>
    <main>
      <form [formGroup]="f" (ngSubmit)="onSubmit()">
        <text-input [label]="'Your Username:'" [controlName]="'username'" [form]="f"></text-input>
        <email-input [label]="'Your Email Address:'" [controlName]="'email'" [form]="f"></email-input>
        <text-input [label]="'Your Address:'" [controlName]="'address'" [form]="f"></text-input>
        <text-input [label]="'Your City:'" [controlName]="'city'" [form]="f"></text-input>
        <text-input [label]="'Your State:'" [controlName]="'State'" [form]="f"></text-input>
        <text-input [label]="'Your Zip Code:'" [controlName]="'zipCode'" [form]="f"></text-input>
        <text-input [label]="'Phone Number:'" [controlName]="'phone'" [form]="f"></text-input>
        <button type="submit" [disabled]="!f.valid">Update Profile</button>
      </form>
    </main>
    
    `
})

export class Profile {
  user$: Observable<User>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  username = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.username)]);
  email = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.email)]);
  address = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]);
  city = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]);
  State = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]);
  zipCode = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.zipCode)]);
  phone = new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.phone)]);

  f = new FormGroup({
    username: this.username,
    email: this.email,
    address: this.address,
    city: this.city,
    State: this.State,
    zipCode: this.zipCode,
    phone: this.phone
  });

  constructor(private store: Store<AppState>, private userActions: UserActions) {
    this.store.dispatch(this.userActions.getProfile());
    this.user$ = store.let(getUser());
    this.loaded$ = store.let(getUserLoaded())
  }

  onSubmit(form) {
    this.store.dispatch(this.userActions.updateProfile(this.f.value));
  }

  ngOnInit() {
    this.user$.subscribe((user: User) => {
      this.username.updateValue(user.username);
      this.email.updateValue(user.email);
      this.address.updateValue(user.address);
      this.city.updateValue(user.city);
      this.State.updateValue(user.State);
      this.zipCode.updateValue(user.zipCode);
      this.phone.updateValue(user.phone);
    })
  }

}