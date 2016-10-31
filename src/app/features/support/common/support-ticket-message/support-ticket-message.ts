import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { TicketMessage } from '../../../../models/ticket';

@Component({
  selector: 'os-support-ticket-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form [formGroup]="f">
    <pre><span *ngIf="!editing">{{f.get('message').value}}</span></pre>
    <textarea-input *ngIf="editing" formControlName="message"></textarea-input>
  </form>
  `
})

export class SupportTicketMessageComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  @Input() editing;
  @Input() save;
  @Input() loading: boolean;
  @Input() ticketMessage: TicketMessage;
  @Output() editMessage = new EventEmitter();
  constructor(fb: FormBuilder) {
    this.f = fb.group({ message: '' });
  }
  ngOnInit() {
    this.f.get('message').setValue(this.ticketMessage.message);
  }
  cancelUpdate() {
    this.f.get('message').setValue(this.ticketMessage.message);
  }
  sendValue() {
    let message = this.f.get('message').value;
    if (message !== this.ticketMessage.message) {
      this.editMessage.emit(Object.assign({}, this.ticketMessage, { message: message }));
    }
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
