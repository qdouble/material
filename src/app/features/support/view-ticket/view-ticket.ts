import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../reducers';
import { TicketActions } from '../../../actions/ticket';
import { getTicket } from '../../../reducers/ticket';
import { Ticket, TicketMessage } from '../../../models/ticket';

@Component({
  selector: 'os-view-ticket',
  template: `

  <header>
  
    <h3>View Ticket
      <button id="os-vt-back-button" md-button [routerLink]="['..']">
      <md-icon id="os-vt-back-button-arrow">keyboard_arrow_left</md-icon>
      GO TO SUPPORT PAGE
      </button>
    </h3>
  </header>
  
  <section>
    <os-support-ticket-form 
    [ticket]="ticket$ | async"
    [ticketObs]="ticket$"
    [addedTicketMessage]="addedTicketMessage$"
    [addingTicketMessage]="addingTicketMessage$"
    (addMessage)=addMessage($event)
    (closeTicket)=closeTicket($event)
    (goBack)=goBack($event)
    (markTicketAsRead)=markTicketAsRead($event)
    >
    </os-support-ticket-form>
  </section>

  `,
  styles: [`#os-vt-back-button, #os-vt-back-button-arrow { vertical-align: middle }`]
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
    route.params.forEach(param => {
      store.dispatch(ticketActions.getTicket(param['id']));
      this.ticket$ = store.let(getTicket(param['id']));
      this.addedTicketMessage$ = this.store.select(s => s.ticket.addedMessage);
      this.addingTicketMessage$ = this.store.select(s => s.ticket.addingMessage);
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
