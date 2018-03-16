import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'os-forgot-password',
  template: `
  <mat-card class="os-page-container-vh">
    <mat-card class="os-login-form-container">
      <mat-card-title>Login</mat-card-title>
        <form [formGroup]="f" (ngSubmit)="submitForm()">
          <button mat-raised-button color="primary" [disabled]="!f.valid" type="submit">
            LOGIN
          </button>
        </form>
    </mat-card>
  </mat-card>
    `,
    styleUrls: ['./login/login.scss']
})

export class ForgotPassword {
  f: FormGroup;
  constructor() { }
  submitForm() {

  }
}
