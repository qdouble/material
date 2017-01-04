import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user';
import { getUserEntryEmail } from '../../reducers/user';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-password-reset',
  templateUrl: './password-reset.html',
  styleUrls: ['./password-reset.css']
})

export class PasswordReset implements OnInit {
  f: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userActions: UserActions
  ) { }

  ngOnInit() {
    this.route.queryParams.forEach(param => {
      console.log(param);
      this.f = new FormGroup({
        email: new FormControl(param['email'], [Validators.required,
        Validators.pattern(RegexValues.email)]),
        code: new FormControl(param['code'], [Validators.required]),
        password: new FormControl(PUBLISH ? '' : 'password', Validators.required),
        confirmPassword: new FormControl(PUBLISH ? '' : 'password', Validators.required)
      });
    });
    this.loading$ = this.store.select(s => s.user.loading);
  }

  submitForm() {
    this.store.dispatch(this.userActions.resetPassword(this.f.value));
  }
}
