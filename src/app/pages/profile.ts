import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';
import { AppState, getUser, getUserLoaded } from '../reducers';
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
      <profile-form [user]="user$ | async" (updateProfile)="onSubmit($event)"></profile-form>
    </main>

    `
})

export class Profile {
  user$: Observable<{[id: string]: User}>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private userActions: UserActions) { 
    this.store.dispatch(this.userActions.getProfile('5649e1a56412e3e085b432a7'));
    this.user$ = store.let(getUser())
  }

  onSubmit(form) {
    this.store.dispatch(this.userActions.updateProfile(form));
  }

}