import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { combineSort } from '../../helper/combine-sort';
import * as fromStore from '../../reducers';
import * as creditRequestActions from './credit-request.actions';
import { CreditRequest } from './credit-request.model';
import * as ticketActions from './ticket.actions';
import { Ticket } from './ticket.model';

@Component({
  selector: 'os-support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class Support implements OnInit {
  added$: Observable<boolean>;
  closedTickets$: Observable<Ticket[]>;
  creditRequests$: Observable<CreditRequest[]>;
  filterValueSubject: ReplaySubject<any> = new ReplaySubject(1);
  lastSort: string;
  openTickets$: Observable<Ticket[]>;
  reverseSort: boolean;
  sortByVar$: Observable<{ sortBy: string; reverse: boolean }>;
  sortByVarToArray$: Observable<(string | boolean)[]>;
  tickets$: Observable<Ticket[]>;
  ticketSubject: string;
  unsortedTickets$: Observable<Ticket[]>;
  constructor(private route: ActivatedRoute, private store: Store<fromStore.AppState>) {
    this.added$ = this.store.select(s => s.ticket.added);

    store.dispatch(new ticketActions.GetTickets());
    store.dispatch(new creditRequestActions.GetCreditRequests());
    this.creditRequests$ = store.pipe(select(fromStore.getCreditRequestCollection));
    this.unsortedTickets$ = store.pipe(select(fromStore.getTicketCollection));

    this.sortByVar$ = this.store.select(s => s.ticket.sortBy);
    this.sortByVarToArray$ = this.sortByVar$.pipe(
      filter(s => s !== undefined),
      map(sort => [sort.sortBy, sort.reverse])
    );
    this.tickets$ = combineLatest(this.sortByVarToArray$, this.unsortedTickets$, combineSort);
    function showClosed(arr: Ticket[], prop) {
      if (!arr) return;
      return arr.filter(ticket => ticket.closed === prop);
    }
    this.openTickets$ = combineLatest(this.tickets$, of(false), showClosed);
    this.closedTickets$ = combineLatest(this.tickets$, of(true), showClosed);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['report']) {
        this.ticketSubject = `I'd like to report the person who referred me`;
      }
    });
  }
  closeTicket(ticket: { id: string; close: boolean }) {
    this.store.dispatch(new ticketActions.CloseTicket(ticket));
  }
  sortBy(prop: string) {
    if (prop === this.lastSort && !this.reverseSort) {
      this.reverseSort = true;
    } else {
      this.reverseSort = false;
    }
    this.store.dispatch(new ticketActions.SortBy({ sortBy: prop, reverse: this.reverseSort }));
    this.lastSort = prop;
  }
}
