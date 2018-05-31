import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../../reducers';
import * as ticketActions from '../ticket.actions';
import { Ticket, TicketMessage } from '../ticket.model';
import { Back } from '../../../actions/router';

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
  constructor(private route: ActivatedRoute, private store: Store<fromStore.AppState>) {
    this.route.params.forEach(param => {
      store.dispatch(new ticketActions.GetTicket(param['id']));
      this.ticket$ = store.pipe(select(fromStore.getSelectedTicket));
      this.addedTicketMessage$ = this.store.pipe(select(fromStore.getTicketAddedMessage));
      this.addingTicketMessage$ = this.store.pipe(select(fromStore.getTicketAddingMessage));
      this.loading$ = this.store.select(s => s.ticket.loading);
    });
  }
  addMessage(message: TicketMessage) {
    this.store.dispatch(new ticketActions.AddMessage(message));
  }
  closeTicket(closeTicket: { id: string; close: boolean }) {
    this.store.dispatch(new ticketActions.CloseTicket(closeTicket));
  }
  goBack(event) {
    this.store.dispatch(new Back());
  }
  markTicketAsRead(ticket: { id: string; mark: boolean }) {
    this.store.dispatch(new ticketActions.MarkTicketAsRead(ticket));
  }
}
