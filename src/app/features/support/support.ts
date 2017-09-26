import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { combineSort } from '../../helper/combine-sort';

import { AppState } from '../../reducers';
import { CreditRequest } from './credit-request.model';
import { Ticket } from './ticket.model';
import { CreditRequestActions } from './credit-request.actions';
import { TicketActions } from './ticket.actions';
import { getCreditRequestCollection } from '../../reducers/credit-request';
import { getTicketCollection } from '../../reducers/ticket';

@Component({
  selector: 'os-support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class Support implements OnInit {
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
  ticketSubject: string;
  unsortedTickets$: Observable<Ticket[]>;
  constructor(
    private creditRequestActions: CreditRequestActions,
    private route: ActivatedRoute,
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
  ngOnInit() {
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
    this.route.params.subscribe(params => {
      if (params['report']) {
        this.ticketSubject = `I'd like to report the person who referred me`;
      }
    });
  }
  closeTicket(ticket: { id: string, close: boolean }) {
    this.store.dispatch(this.ticketActions.closeTicket(ticket));
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
