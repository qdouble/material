import {Component} from '@angular/core';
import { FormControl, FormGroup, FormControlName, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component ({
  selector: 'admin-login',
  template: `
  
  <header>
    <h1>Admin Login</h1>
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

export class AdminLogin {
  f = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  onSubmit(){
    console.log(this.f.value)
  }
}