import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'os-forgot-password',
  template: `
  <md-card class="os-page-container-vh">
    <md-card class="os-login-form-container">
      <md-card-title>Login</md-card-title>
        <form [formGroup]="f" (ngSubmit)="submitForm()">
          <button md-raised-button color="primary" [disabled]="!f.valid" type="submit">
            LOGIN
          </button>
        </form>
    </md-card>
  </md-card>
    `,
    styleUrls: ['./login/login.scss']
})

export class ForgotPassword {
  f: FormGroup;
  constructor() { }
  submitForm() {

  }
}
