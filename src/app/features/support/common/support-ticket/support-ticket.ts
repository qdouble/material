import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../../../reducers';
import { TicketActions } from '../../ticket.actions';

@Component({
  selector: 'os-support-ticket',
  template: `
  <section>
    <form [formGroup]="f" (ngSubmit)="submitForm()">
      <md-input-container>
        <input mdInput maxlength=90 placeholder="Subject" formControlName="subject">
      </md-input-container>
      <br>
      <md-input-container>
        <textarea mdInput [rows]="6" placeholder="Question" formControlName="question"></textarea>
      </md-input-container>
      <br>
      <button md-raised-button class="white" color="primary" [disabled]="!f.valid">SUBMIT</button>
    </form>
  </section>
  `,
  styles: [`md-input-container { width: 99%; }`]
})

export class SupportTicket implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  f = new FormGroup({
    subject: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required)
  });
  @Input() addedObs: Observable<boolean>;
  @Input() ticketSubject: string;
  constructor(
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) { }

  ngOnInit() {
    this.f.get('subject').setValue(this.ticketSubject);
  }

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
