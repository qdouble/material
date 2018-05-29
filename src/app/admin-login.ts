import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import * as userActions from './actions/user';

@Component({
  selector: 'os-admin-login',
  template: `
    <mat-card class="os-page-container-vh">
    <mat-card class="os-login-form-container">
      <mat-card-title>Admin Login</mat-card-title>
        <form [formGroup]="f" (ngSubmit)="submitForm()">
        <mat-input-container>
          <input matInput placeholder="Username" formControlName="username">
        </mat-input-container><br>
        <mat-input-container>
          <input matInput placeholder="Password" formControlName="password" type="password">
        </mat-input-container>
        <br>
        <button mat-raised-button class="white" color="primary" [disabled]="!f.valid" type="submit">
          LOGIN
        </button>
        </form>
    </mat-card>
  </mat-card>
  `,
  styleUrls: ['./admin-login.scss']
})
export class AdminLogin implements OnDestroy, OnInit {
  f: FormGroup;
  constructor(fb: FormBuilder, private store: Store<AppState>) {
    this.f = fb.group({ username: '', password: '' });
  }
  ngOnInit() {
    this.store.dispatch(new userActions.SetAdminLoginPage(true));
  }
  submitForm() {
    this.store.dispatch(new userActions.AdminLogin(this.f.value));
  }
  ngOnDestroy() {
    this.store.dispatch(new userActions.SetAdminLoginPage(false));
  }
}
