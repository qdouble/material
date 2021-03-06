import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { AppState } from '../../../../reducers';
import * as ticketActions from '../../ticket.actions';
import { filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'os-support-ticket',
  template: `
  <section>
    <form *ngIf="!hide" [formGroup]="f" (ngSubmit)="submitForm()">
      <mat-form-field>
        <input matInput maxlength=90 placeholder="Subject" formControlName="subject">
      </mat-form-field>
      <br>
      <mat-form-field>
        <textarea matInput [rows]="6" placeholder="Question" formControlName="question"></textarea>
      </mat-form-field>
      <br>
      <button mat-raised-button class="white" color="primary" [disabled]="!f.valid">SUBMIT</button>
    </form>
    <b class="primary" *ngIf="hide">
    Support ticket sent successfully!
    You should receive an email notification after your ticket is responded to.
    </b>
  </section>
  `,
  styles: [`mat-form-field { width: 99%; }`]
})
export class SupportTicket implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  f = new FormGroup({
    subject: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required)
  });
  hide: boolean;
  @Input() addedObs: Observable<boolean>;
  @Input() ticketSubject: string;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.f.get('subject').setValue(this.ticketSubject);
  }

  submitForm() {
    this.store.dispatch(new ticketActions.AddTicket(this.f.value));
    this.addedObs
      .pipe(filter(a => a === true), take(1), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.f.reset();
        this.hide = true;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
