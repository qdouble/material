/* tslint:disable: variable-name */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models';
import { AppState, getUser, getUserLoaded, getUserLoading } from '../reducers';
import { UserActions } from '../actions';
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
  loadedUser$: Subscription;

  f = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.username)]),
    email: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.email)]),
    address: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]),
    city: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]),
    State: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.address)]),
    zipCode: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.zipCode)]),
    phone: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.phone)])
  });

  constructor(private store: Store<AppState>, private userActions: UserActions) {
    this.user$ = store.let(getUser());
    this.loaded$ = store.let(getUserLoaded());
  }

  onSubmit(form) {
    this.store.dispatch(this.userActions.updateProfile(this.f.value));
  }

  ngOnInit() {
    this.loadedUser$ = this.user$.subscribe((user: User) => {
      let loadedUser = Object.assign({}, user);
      delete loadedUser['id'];
      this.f.updateValue(loadedUser);
    });
  }

  ngOnDestroy() {
    this.loadedUser$.unsubscribe();
  }
}
