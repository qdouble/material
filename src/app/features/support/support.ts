import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { combineSort } from '../../helper/combine-sort';

import { AppState } from '../../reducers';
import { CreditRequest } from '../../models/credit-request';
import { Ticket } from '../../models/ticket';
import { CreditRequestActions } from '../../actions/credit-request';
import { TicketActions } from '../../actions/ticket';
import { getCreditRequestCollection } from '../../reducers/credit-request';
import { getTicketCollection } from '../../reducers/ticket';

@Component({
  selector: 'os-support',
  templateUrl: './support.html',
  styleUrls: ['./support.css']
})

export class Support {
  added$: Observable<boolean>;
  closedTickets$: Observable<Ticket[]>;
  creditRequests$: Observable<CreditRequest[]>;
  filterValueSubject: ReplaySubject<any> = new ReplaySubject(1);
  lastSort: string;
  openTickets$: Observable<Ticket[]>;
  reverseSort: boolean;
  sortByVar$: Observable<{ sortBy: string, reverse: boolean }>;
  sortByVarToArray$: Observable<(string | boolean)[]>;
  tickets$: Observable<Ticket[]>;
  unsortedTickets$: Observable<Ticket[]>;
  constructor(
    private creditRequestActions: CreditRequestActions,
    private store: Store<AppState>,
    private ticketActions: TicketActions
  ) {
    this.added$ = this.store.select(s => s.ticket.added);

    store.dispatch(this.ticketActions.getTickets());
    store.dispatch(this.creditRequestActions.getCreditRequests());
    this.creditRequests$ = store.let(getCreditRequestCollection());
    this.unsortedTickets$ = store.let(getTicketCollection());

    this.sortByVar$ = this.store.select(state => state.ticket.sortBy);
    this.sortByVarToArray$ = this.sortByVar$
      .filter(s => s !== undefined)
      .map(sort => [sort.sortBy, sort.reverse]);
    this.tickets$ = Observable
      .combineLatest(this.sortByVarToArray$, this.unsortedTickets$, combineSort);
    function showClosed(arr: Ticket[], prop) {
      return arr.filter(ticket => ticket.closed === prop);
    }
    this.openTickets$ = Observable
      .combineLatest(this.tickets$, Observable.of(false), showClosed);
    this.closedTickets$ = Observable
      .combineLatest(this.tickets$, Observable.of(true), showClosed);

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
