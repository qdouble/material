import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user';
import { getUserEntryEmail } from '../../reducers/user';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class Login {
  entryEmail$: Observable<string | null>;

  f = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(RegexValues.email)]),
    password: new FormControl('password', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.entryEmail$ = store.let(getUserEntryEmail());
    this.entryEmail$.take(1).subscribe(email => {
      if (email) this.f.get('email').setValue(email);
    });
  }

  submitForm() {
    this.store.dispatch(this.userActions.login(this.f.value));
  }
}
