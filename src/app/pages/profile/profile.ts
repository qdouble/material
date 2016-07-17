/* tslint:disable: variable-name */
import { Component } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserActions } from '../../actions';
import { INPUT_FIELDS } from '../../components';
import { User } from '../../models';
import { AppState, getUser, getUserLoaded } from '../../reducers';
import { RegexValues } from '../../validators';

@Component({
  selector: 'profile',
  directives: [REACTIVE_FORM_DIRECTIVES, INPUT_FIELDS],
  template: require('./profile.html')
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

  submit() {
    this.store.dispatch(this.userActions.updateProfile(this.f.value));
  }

  ngOnInit() {
    this.loadedUser$ = this.user$.subscribe((user: User) => {
      let loadedUser = Object.assign({}, user);
      delete loadedUser['id'];
      delete loadedUser['currentSponsor'];
      delete loadedUser['sponsorUsername'];
      this.f.updateValue(loadedUser);
    });
  }

  ngOnDestroy() {
    this.loadedUser$.unsubscribe();
  }
}
