/* tslint:disable: variable-name */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserActions } from '../../actions';
import { User } from '../../models';
import { AppState, getUser, getUserLoaded } from '../../reducers';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-profile',
  templateUrl: './profile.html'
})

export class Profile implements OnDestroy, OnInit {
  user$: Observable<User>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  loadedUserSub: Subscription;

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

  submitForm() {
    this.store.dispatch(this.userActions.updateProfile(this.f.value));
  }

  ngOnInit() {
    this.loadedUserSub = this.user$.subscribe((user: User) => {
      let loadedUser = Object.assign({}, user);
      this.f.patchValue(loadedUser);
    });
  }

  ngOnDestroy() {
    this.loadedUserSub.unsubscribe();
  }
}
