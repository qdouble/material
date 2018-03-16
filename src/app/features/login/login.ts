import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as fromStore from '../../reducers';
import * as userActions from '../../actions/user';

@Component({
  selector: 'os-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class Login implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  entryEmail$: Observable<string | null>;
  forgotPassword: boolean;
  loading$: Observable<boolean>;
  resetEmailSent$: Observable<boolean>;

  f = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(PUBLISH ? '' : 'password', Validators.required)
  });

  constructor(
    private store: Store<fromStore.AppState>
  ) {
    this.entryEmail$ = store.pipe(select(fromStore.getUserEntryEmail));
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
      this.store.dispatch(new userActions.ForgotPassword(this.f.value['email']));
      this.resetEmailSent$
        .filter(sent => sent === true)
        .take(1)
        .takeUntil(this.destroyed$)
        .subscribe(sent => {
          this.cancelForgotPassword();
        });
    } else {
      this.store.dispatch(new userActions.Login(this.f.value));
    }
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
