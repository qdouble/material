/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { TicketService } from '../services';
import { TicketActions } from '../actions';

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

    @Effect() submitTicket$ = this.actions$
    .ofType(TicketActions.SUBMIT_TICKET)
    .map(action => <string>action.payload)
    .switchMap(ticket => this.ticketService.submitTicket(ticket)
      .map((res: any) => this.ticketActions.submitTicketSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.submitTicketFail(err)
      ))
    );
}
