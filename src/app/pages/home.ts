import { Component } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { UserActions } from '../actions';
import { RegexValues } from '../validators';

@Component({
  selector: 'home',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Welcome to Offer System</h1>
  </header>
  <main>
    <h2>Step 1: Choose How You Would Like to Receive Your Prize</h2>
    <p>-- Put Prize Option Here--</p>
    <h2> Step 2: Register or Extend Your Account</h2>
    <form novalidate [formGroup]="f" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Email address</label>
        <input formControlName="email" type="text" class="form-control">
        <button type="submit" [disabled]="!f.valid">Submit</button>
      </div>
    </form>
  </main>
  
  `
})

export class Homepage {
  constructor(private store: Store<AppState>, private userActions: UserActions) { }


  f = new FormGroup({
    email: new FormControl('qdouble@gmail.com', [Validators.required, Validators.pattern(RegexValues.email)])
  })

  onSubmit() {
    this.store.dispatch(this.userActions.checkEmail(this.f.controls['email'].value));
  }
}
