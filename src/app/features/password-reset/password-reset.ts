import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from '../../validators';

import { AppState } from '../../reducers';
import * as userActions from '../../actions/user';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-password-reset',
  templateUrl: './password-reset.html',
  styleUrls: ['./password-reset.scss']
})
export class PasswordReset implements OnInit {
  f: FormGroup;
  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.f = new FormGroup(
        {
          email: new FormControl(params['email'], [
            Validators.required,
            Validators.pattern(RegexValues.email)
          ]),
          code: new FormControl(params['code'], [Validators.required]),
          password: new FormControl(PUBLISH ? '' : 'password', Validators.required),
          confirmPassword: new FormControl(PUBLISH ? '' : 'password', Validators.required)
        },
        CustomValidators.compare('password', 'confirmPassword', 'comparePassword')
      );
    });
    this.loading$ = this.store.select(s => s.user.loading);
  }

  submitForm() {
    this.store.dispatch(new userActions.ResetPassword(this.f.value));
  }
}
