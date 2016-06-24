import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';
import { AppState, getUser, getUserLoaded, getUserLoading } from '../reducers';
import { UserActions } from '../actions';
import { ProfileForm } from '../components/profile-form';

@Component({
  selector: 'profile',
  directives: [REACTIVE_FORM_DIRECTIVES, ProfileForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <header>
      <h1>Profile</h1>
    </header>
    <main>
      <profile-form [f]="f" [user]="user$ | async" [loaded]="loaded$ | async" (updateProfile)="onSubmit($event)"></profile-form>
    </main>

    `
})

export class Profile {
  user$: Observable<User>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  username = new FormControl();
  email = new FormControl();
  address = new FormControl();
  city = new FormControl();
  State = new FormControl();
  zipCode = new FormControl();
  phone = new FormControl();
  
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
    this.user$.subscribe((user: User) => {
      this.username.updateValue(user.username),
      this.email.updateValue(user.email),
      this.address.updateValue(user.address),
      this.city.updateValue(user.city),
      this.State.updateValue(user.State),
      this.zipCode.updateValue(user.zipCode),
      this.phone.updateValue(user.phone)
    })
  }

  onSubmit(form) {
    this.store.dispatch(this.userActions.updateProfile(form));
  }

}