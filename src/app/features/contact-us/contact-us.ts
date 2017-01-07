import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../reducers';
import { UIActions } from '../../actions/ui';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-contact-us',
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})

export class ContactUs implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  hideForm: boolean = true;
  sending$: Observable<boolean>;
  sent$: Observable<boolean>;
  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private uiActions: UIActions
  ) {
    this.f = fb.group({
      email: ['', [Validators.required, Validators.pattern(RegexValues.email)]],
      subject: ['', [Validators.required, Validators.maxLength(60)]],
      question: ['', [Validators.required, Validators.maxLength(30000)]]
    });

    this.sending$ = store.select(s => s.ui.sendingContact);
    this.sent$ = store.select(s => s.ui.contactRequestSent);
  }
  submitForm() {
    this.store.dispatch(this.uiActions.contactUs(this.f.value));
    this.sent$
      .filter(s => s === true)
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.f.reset();
        this.hideForm = true;
      });
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
