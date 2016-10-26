import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../reducers';
import { TicketActions } from '../../../actions';

@Component({
  selector: 'os-support-ticket',
  template: `
  <section>
    <form [formGroup]="f" (ngSubmit)="submitForm()">
      <md-input placeholder="Subject" formControlName="subject"></md-input><br>
      <textarea rows="4" cols="50" placeholder="Question" formControlName="question"></textarea><br>
      <button md-raised-button [disabled]="!f.valid">Submit</button>
    </form>
  </section>
  `
})

export class SupportTicket {
  f = new FormGroup({
    subject: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required)
  });
  constructor(
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) { }

  submitForm() {
    this.store.dispatch(this.ticketActions.addTicket(this.f.value));
  }
}
