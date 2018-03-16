import { Component, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as fromStore from '../../reducers';
import * as uiActions from '../../actions/ui';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-contact-us',
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class ContactUs implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  hideForm: boolean;
  sending$: Observable<boolean>;
  sent$: Observable<boolean>;
  constructor(
    fb: FormBuilder,
    private store: Store<fromStore.AppState>
  ) {
    this.f = fb.group({
      email: ['', [Validators.required, Validators.pattern(RegexValues.email)]],
      subject: ['', [Validators.required, Validators.maxLength(60)]],
      question: ['', [Validators.required, Validators.maxLength(30000)]]
    });

    this.sending$ = store.pipe(select(fromStore.getUISendingContact));
    this.sent$ = store.pipe(select(fromStore.getUIContactRequestSent));
  }
  submitForm() {
    this.store.dispatch(new uiActions.ContactUs(this.f.value));
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
