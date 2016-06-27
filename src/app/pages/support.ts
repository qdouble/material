import { Component } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../reducers';
import { UserActions } from '../actions';
import { RegexValues } from '../validators';
import { INPUT_FIELDS } from '../components';

@Component({
  selector: 'support',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `

  <header>
    <h1>Support</h1>
  </header>
  <main>
  </main>

  `
})

export class Support {

}