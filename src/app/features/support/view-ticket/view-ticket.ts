import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../reducers';
import { TicketActions } from '../ticket.actions';
import { getTicket, getTicketAddedMessage, getTicketAddingMessage } from '../../../reducers/ticket';
import { Ticket, TicketMessage } from '../ticket.model';

@Component({
  selector: 'os-view-ticket',
  templateUrl: './view-ticket.html',
  styleUrls: ['./view-ticket.scss']
})

export class ViewTicket {
  addedTicketMessage$: Observable<boolean>;
  addingTicketMessage$: Observable<boolean>;
  loading$: Observable<boolean>;
  ticket$: Observable<Ticket>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) {
    this.route.params.forEach(param => {
      store.dispatch(ticketActions.getTicket(param['id']));
      this.ticket$ = store.let(getTicket(param['id']));
      this.addedTicketMessage$ = this.store.let(getTicketAddedMessage());
      this.addingTicketMessage$ = this.store.let(getTicketAddingMessage());
      this.loading$ = this.store.select(s => s.ticket.loading);
    });
  }
  addMessage(message: TicketMessage) {
    this.store.dispatch(this.ticketActions.addMessage(message));
  }
  closeTicket(closeTicket: { id: string, close: boolean }) {
    this.store.dispatch(this.ticketActions.closeTicket(closeTicket));
  }
  goBack(event) {
    this.store.dispatch(back());
  }
  markTicketAsRead(ticket: { id: string, mark: boolean }) {
    this.store.dispatch(this.ticketActions.markTicketAsRead(ticket));
  }
}
