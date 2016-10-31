import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { combineSort } from '../../helper/combine-sort';

import { AppState } from '../../reducers';
import { Ticket } from '../../models/ticket';
import { TicketActions } from '../../actions/ticket';
import { getTicketCollection } from '../../reducers/ticket';

@Component({
  selector: 'os-support',
  template: `
  <header>
    <h1>Support</h1>
  </header>
  <section>
    <md-card style="max-width: 572px">
      <md-card-title>New Support Ticket</md-card-title>
    <os-support-ticket [addedObs]="added$"></os-support-ticket>
    </md-card>
    <h4>Support Tickets</h4>
    <os-support-ticket-table
    [tickets]="tickets$ | async"
    (closeTicket)=closeTicket($event)
    (reload)=reload($event)
    (sortBy)=sortBy($event)
    ></os-support-ticket-table>
  </section>
  `
})

export class Support {
  added$: Observable<boolean>;
  lastSort: string;
  reverseSort: boolean;
  sortByVar$: Observable<{ sortBy: string, reverse: boolean }>;
  sortByVarToArray$: Observable<(string | boolean)[]>;
  tickets$: Observable<Ticket[]>;
  unsortedTickets$: Observable<Ticket[]>;
  constructor(
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) {
    this.added$ = this.store.select(s => s.ticket.added);

    store.dispatch(this.ticketActions.getTickets());
    this.unsortedTickets$ = store.let(getTicketCollection());

    this.sortByVar$ = this.store.select(state => state.ticket.sortBy);
    this.sortByVarToArray$ = this.sortByVar$
      .filter(s => s !== undefined)
      .map(sort => [sort.sortBy, sort.reverse]);
    this.tickets$ = Observable
      .combineLatest(this.sortByVarToArray$, this.unsortedTickets$, combineSort);
  }
  closeTicket(ticket: { id: string, close: boolean }) {
    this.store.dispatch(this.ticketActions.closeTicket(ticket));
  }
  reload(event) {
    this.store.dispatch(this.ticketActions.getTickets());
  }
  sortBy(prop: string) {
    if (prop === this.lastSort && !this.reverseSort) {
      this.reverseSort = true;
    } else {
      this.reverseSort = false;
    }
    this.store.dispatch(
      this.ticketActions.sortBy({ sortBy: prop, reverse: this.reverseSort })
    );
    this.lastSort = prop;
  }
}
