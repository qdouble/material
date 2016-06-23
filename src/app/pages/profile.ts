import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';
import { AppState, getUser, getUserLoaded } from '../reducers';
import { UserActions } from '../actions';

@Component({
  selector: 'child-cmp',
  template: `
  <pre>{{user | json}}</pre>
  Email: {{user.email}}<br/>
  Username: {{user.username}}
  `
})

export class ChildCmp {
  @Input() user
}

@Component({
  selector: 'profile',
  directives: [REACTIVE_FORM_DIRECTIVES, ChildCmp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <header>
      <h1>Profile</h1>
    </header>
    <main>
      <form [formGroup]="f" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Your Username:</label>
          <input formControlName="username" type="text" class="form-control"> {{user$ | async}}
        </div>
        <div class="form-group">
          <label>Your E-mail Address:</label>
          <input formControlName="email" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Street Address:</label>
          <input formControlName="address" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Your City:</label>
          <input formControlName="city" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Your State:</label>
          <input formControlName="State" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Zip Code:</label>
          <input formControlName="zipCode" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Phone Number:</label>
          <input formControlName="phone" type="text" class="form-control">
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </main>

    <br/>
    Unresolved: {{ user$ | async }}
    <br/>
    User Loaded:
    <child-cmp [user]="user$ | async"></child-cmp>


    `
})

export class Profile {
  user$: Observable<{[id: string]: User}>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private userActions: UserActions) { 
    this.store.dispatch(this.userActions.getProfile('5649e1a56412e3e085b432a7'));
    this.user$ = store.let(getUser())
  }

  f = new FormGroup({
    username: new FormControl(),
    email: new FormControl('registered@user.com'),
    address: new FormControl('123 Street'),
    city: new FormControl('Las Vegas'),
    State: new FormControl('Nevada'),
    zipCode: new FormControl('89723-3232'),
    phone: new FormControl('(353)382-3324')
  })

  onSubmit() {
    this.store.dispatch(this.userActions.updateProfile(this.f.value)); 
  }

  ngOnInit(){
    this.user$.subscribe((data) => {
      console.log(data);
    })
  }

}