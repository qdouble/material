import { Component } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from '../../actions';
import { INPUT_FIELDS } from '../../components';
import { AppState, getUserEntryEmail } from '../../reducers';
import { RegexValues } from '../../validators';

@Component({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES, INPUT_FIELDS],
  template: require('./login.html')
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
      if (email) this.f.controls['email'].updateValue(email);
    });
  }

  submitForm() {
    this.store.dispatch(this.userActions.login(this.f.value));
  }
}
