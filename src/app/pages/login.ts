import {Component} from '@angular/core';
import { FormControl, FormGroup, FormControlName, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../reducers';
import { UserActions } from '../actions';

@Component ({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Login</h1>
  </header>
  <main> 
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Username</label>
        <input formControlName="username" type="text" class="form-control">
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
  constructor(private store: Store<AppState>, private userActions: UserActions) {}
  
  f = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  onSubmit(){
    console.log('this.f.value', this.f.value);
    console.log('this.f', this.f);
    this.store.dispatch(this.userActions.login(this.f.value));
  }
}
