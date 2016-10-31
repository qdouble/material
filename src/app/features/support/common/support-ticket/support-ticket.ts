import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../../../reducers';
import { TicketActions } from '../../../../actions/ticket';

@Component({
  selector: 'os-support-ticket',
  template: `
  <section>
    <form [formGroup]="f" (ngSubmit)="submitForm()">
      <md-input maxlength=90 placeholder="Subject" formControlName="subject"></md-input><br>
      <textarea rows="4" cols="50" placeholder="Question" formControlName="question"></textarea><br>
      <button md-raised-button color="primary" [disabled]="!f.valid">SUBMIT</button>
    </form>
  </section>
  `,
  styles: [`md-input, textarea { width: 99%; }`]
})

export class SupportTicket implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  f = new FormGroup({
    subject: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required)
  });
  @Input() addedObs: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) { }

  submitForm() {
    this.store.dispatch(this.ticketActions.addTicket(this.f.value));
    this.addedObs
      .filter(a => a === true)
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(() => this.f.reset());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
