import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, OnDestroy, Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Ticket, TicketMessage } from '../../ticket.model';

@Component({
  selector: 'os-support-ticket-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './support-ticket-form.html',
  styles: [`md-input-container{ width: 100%; }`]
})

export class SupportTicketFormComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  @Input() addedTicketMessageObs: Observable<boolean>;
  @Input() addingTicketMessageObs: Observable<boolean>;
  @Input() loading: boolean;
  @Input() ticket: Ticket;
  @Input() ticketObs: Observable<Ticket>;
  @Output() addMessage = new EventEmitter();
  @Output() closeTicket = new EventEmitter();
  @Output() editMessage = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() markTicketAsRead = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) {
    this.f = this.fb.group({
      message: ''
    });
  }

  ngOnInit() {
    this.ticketObs
      .takeUntil(this.destroyed$)
      .filter(t => t !== undefined)
      .take(1)
      .subscribe(t => {
        if (!t.readByUser) {
          this.markTicketAsRead.emit({ id: t.id, mark: true });
        }
      });
  }

  fSubmit() {
    this.addMessage.emit(<TicketMessage>{
      message: this.f.get('message').value,
      ticketId: this.ticket.id
    });
    this.addedTicketMessageObs
      .filter(v => v === true)
      .take(1)
      .takeUntil(this.destroyed$)
      .subscribe(v => {
        this.f.get('message').setValue('');
      });
  }

  trackById(index: number, entry) {
    return entry.id;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
