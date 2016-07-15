import { Component } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getUserEntryEmail } from '../reducers';
import { UserActions } from '../actions';
import { RegexValues } from '../validators';
import { INPUT_FIELDS } from '../components';

@Component({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES, INPUT_FIELDS],
  template: `

  <header>
    <h1>Login</h1>
  </header>
  <main> 
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
      <email-input [label]="'Email Address'" [controlName]="'email'" [form]="f"></email-input>
      <password-input [label]="'Password'" [controlName]="'password'" [form]="f"></password-input>
      <button [disabled]="!f.valid" type="submit">Login</button>
    </form> 
  </main>

  `
})

export class Login {
  entryEmail$: Observable<string | null>;

  f = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.email)]),
    password: new FormControl('password', Validators.required)
  });

  constructor(private store: Store<AppState>, private userActions: UserActions) {
    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.f.controls['email'].updateValue(email);
    });
  }

  onSubmit() {
    this.store.dispatch(this.userActions.login(this.f.value));
  }
}
