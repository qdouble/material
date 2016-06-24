import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Validators } from '@angular/common';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, FormGroupName } from '@angular/forms';
import { User } from '../models';

@Component({
  selector: 'profile-form',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <div *ngIf="loaded">
      <form [formGroup]="f" (ngSubmit)="updateProfile.emit(f.value)">
        <div class="form-group">
          <label>Your Username:</label>
          <input formControlName="username" class="form-control"> {{user$ | async}}
        </div>
        <div class="form-group">
          <label>Your E-mail Address:</label>
          <input formControlName="email" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Street Address:</label>
          <input formControlName="address" class="form-control">
        </div>
        <div class="form-group">
          <label>Your City:</label>
          <input formControlName="city" class="form-control">
        </div>
        <div class="form-group">
          <label>Your State:</label>
          <input formControlName="State" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Zip Code:</label>
          <input formControlName="zipCode" class="form-control">
        </div>
        <div class="form-group">
          <label>Your Phone Number:</label>
          <input formControlName="phone" class="form-control">
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    `
})

export class ProfileForm {
  @Input() user: User;
  @Input() loaded: boolean;
  @Input() f: FormGroup;
  @Output() updateProfile = new EventEmitter();

}