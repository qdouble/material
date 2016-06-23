import {Component} from '@angular/core';
import { FormArray, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
// import { InputField } from '../components/text-input';


@Component({
  selector: 'register',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
  
  <header>
    <h1>Registration Page</h1>
  </header>
  <main>
  <!--
    <form [formGroup]="f"  (ngSubmit)="onSubmit()">
      <div formArrayName="details">
          <div *ngFor="let detail of userArray.controls; let i=index">
              <input [formControlName]="i">
          </div>
      </div>
      <button type="submit">Register</button>
    </form>
    <button (click)="push()">push</button>
  -->

  <form [formGroup]="form">
 <div formArrayName="cities">
    <div *ngFor="let city of cityArray.controls; let i=index" >
       <input [formControlName]="i">
    </div>
 </div>
</form>
<button (click)="push()">push</button>

  </main>
  
  `
})

export class Register {

  cityArray = new FormArray([
    new FormControl('SF'), new FormControl('NY')
  ]);
  form = new FormGroup({
    cities: this.cityArray
  });

  push() {
    this.cityArray.push(new FormControl(''));
  }

  // userArray = new FormArray([
  //   new FormControl('FirstName'), 
  //   new FormControl('LastName')
  // ])

  // f = new FormGroup({
  //   details: this.userArray
  // })


  // push() {
  //   this.userArray.push(new FormControl(''));
  // }

  // onSubmit() {
  //   console.log('this.f.value: ', this.f.value)
  //   console.log('this.f: ', this.f)
  // }
}