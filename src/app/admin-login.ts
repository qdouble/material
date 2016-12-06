import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import { UserActions } from './actions/user';

@Component({
  selector: 'os-admin-login',
  template: `
    <md-card class="os-page-container-vh">
    <md-card class="os-login-form-container">
      <md-card-title>Admin Login</md-card-title>
        <form [formGroup]="f" (ngSubmit)="submitForm()">
        <md-input placeholder="Username" formControlName="username"></md-input><br>
        <md-input placeholder="Password" formControlName="password" type="password"></md-input><br>
        <button md-raised-button class="white" color="primary" [disabled]="!f.valid" type="submit">
          LOGIN
        </button>
        </form>
    </md-card>
  </md-card>
  `,
  styleUrls: ['./admin-login.css']
})

export class AdminLogin implements OnDestroy, OnInit {
  f: FormGroup;
  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.f = fb.group({ username: '', password: '' });
  }
  ngOnInit() {
    this.store.dispatch(this.userActions.setAdminLoginPage(true));
  }
  submitForm() {
    this.store.dispatch(this.userActions.adminLogin(this.f.value));
  }
  ngOnDestroy() {
    this.store.dispatch(this.userActions.setAdminLoginPage(false));
  }
}
