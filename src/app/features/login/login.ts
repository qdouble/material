import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user';
import { getUserEntryEmail } from '../../reducers/user';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class Login implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  entryEmail$: Observable<string | null>;
  forgotPassword: boolean;
  loading$: Observable<boolean>;
  resetEmailSent$: Observable<boolean>;

  f = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.email)]),
    password: new FormControl(PUBLISH ? '' : 'password', Validators.required)
  });

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.f.get('email').setValue(email);
    });
    this.loading$ = this.store.select(s => s.user.loading);
    this.resetEmailSent$ = this.store.select(s => s.user.resetEmailSent);
  }

  cancelForgotPassword() {
    this.f.get('password').enable();
    this.f.get('password').setValue('');
    this.forgotPassword = false;
  }

  enableForgotPassword() {
    this.f.get('password').disable();
    this.forgotPassword = true;
  }

  submitForm() {
    if (this.forgotPassword) {
      this.store.dispatch(this.userActions.forgotPassword(this.f.value['email']));
      this.resetEmailSent$
        .filter(sent => sent === true)
        .take(1)
        .takeUntil(this.destroyed$)
        .subscribe(sent => {
          this.cancelForgotPassword();
        });
    } else {
      this.store.dispatch(this.userActions.login(this.f.value));
    }
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
