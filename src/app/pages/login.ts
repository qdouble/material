import {Component} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getUserEntryEmail } from '../reducers';
import { UserActions } from '../actions';

@Component({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Login</h1>
  </header>
  <main> 
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Email address</label>
        <input formControlName="email" type="email" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input formControlName="password" type="password" class="form-control">
      </div>
      <button type="submit">Login</button>
    </form> 
  </main>
  
  `
})

export class Login {
  entryEmail$: Observable<string>;
  email = new FormControl('registered@user.com');
  password = new FormControl('password');

  f = new FormGroup({
    email: this.email,
    password: this.password
  })

  constructor(private store: Store<AppState>, private userActions: UserActions) { 
    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.email.updateValue(email)
    });
  }

  onSubmit() {
    this.store.dispatch(this.userActions.login(this.f.value));
  }
}
