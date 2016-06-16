import {Component} from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormGroupName, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component ({
  selector: 'register',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Registration Page</h1>
  </header>
  <main>
    <form [formGroup]="f" (ngSubmit)="onSubmit()">
    <div formGroupName="name">
      <div class="form-group">
        <label>First Name</label>
        <input formControlName="firstName" class="form-control">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input formControlName="lastName" class="form-control">
      </div>
    </div>
    <div class="form-group">
      <label>City</label>
      <input formControlName="city">
    </div>

    <button type="submit">Register</button>
    </form>
  </main>
  
  `
})

export class Register {

  myForm = new FormGroup({
    name: new FormControl('My Name')
  })

  f = new FormGroup({
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    }),
    city: new FormControl('Miami')
  })
  onSubmit(){
    console.log('this.f.value: ', this.f.value)
    console.log('this.f: ', this.f)
  }
}