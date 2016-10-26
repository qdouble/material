/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { TicketService } from '../services/ticket';
import { TicketActions } from '../actions/ticket';

@Injectable()

export class TicketEffects {
  constructor(
    public actions$: Actions,
    private ticketActions: TicketActions,
    private ticketService: TicketService,
    private store: Store<AppState>
  ) { }

  @Effect() closeTicket$ = this.actions$
    .ofType(TicketActions.CLOSE_TICKET)
    .map(action => <string>action.payload)
    .switchMap(id => this.ticketService.closeTicket(id)
      .map((res: any) => this.ticketActions.getTicketsSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.getTicketsFail(err)
      ))
    );

  @Effect() getTickets$ = this.actions$
    .ofType(TicketActions.GET_TICKETS)
    .map(action => <string>action.payload)
    .switchMap(email => this.ticketService.getTickets()
      .map((res: any) => this.ticketActions.getTicketsSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.getTicketsFail(err)
      ))
    );

    @Effect() addTicket$ = this.actions$
    .ofType(TicketActions.ADD_TICKET)
    .map(action => <string>action.payload)
    .switchMap(ticket => this.ticketService.addTicket(ticket)
      .map((res: any) => this.ticketActions.addTicketSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.addTicketFail(err)
      ))
    );
}
