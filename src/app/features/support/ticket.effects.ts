/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { NotifyActions } from '../../actions/notify';
import { Ticket, TicketMessage } from './ticket.model';
import { TicketActions } from './ticket.actions';
import { TicketService } from './ticket.service';

@Injectable()

export class TicketEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private ticketActions: TicketActions,
    private ticketService: TicketService
  ) { }

  @Effect() addTicketMessage$ = this.actions$
    .ofType(TicketActions.ADD_MESSAGE)
    .map(action => <TicketMessage>action.payload)
    .switchMap(message => this.ticketService.addMessage(message)
      .map((res) => this.ticketActions.addMessageSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.addMessageFail(err)
      ))
    );

  @Effect() addTicket$ = this.actions$
    .ofType(TicketActions.ADD_TICKET)
    .map(action => <Ticket>action.payload)
    .switchMap(ticket => this.ticketService.addTicket(ticket)
      .switchMap((res: any) => Observable.of(
        this.ticketActions.addTicketSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .catch((err) => Observable.of(
        this.ticketActions.addTicketFail(err)
      ))
    );

  @Effect() closeTicket$ = this.actions$
    .ofType(TicketActions.CLOSE_TICKET)
    .map(action => <{ id: string, close: boolean }>action.payload)
    .switchMap(id => this.ticketService.closeTicket(id)
      .map((res) => this.ticketActions.closeTicketSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.closeTicketFail(err)
      ))
    );

  @Effect() getTicket$ = this.actions$
    .ofType(TicketActions.GET_TICKET)
    .map(action => <string>action.payload)
    .switchMap(id => this.ticketService.getTicket(id)
      .map((res) => this.ticketActions.getTicketSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.getTicketFail(err)
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

  @Effect() markTicketAsRead$ = this.actions$
    .ofType(TicketActions.MARK_TICKET_AS_READ)
    .map(action => <{ id: string, mark: boolean }>action.payload)
    .switchMap(ticket => this.ticketService.markTicketAsRead(ticket)
      .map((res) => this.ticketActions.markTicketAsReadSuccess(res))
      .catch((err) => Observable.of(
        this.ticketActions.markTicketAsReadFail(err)
      ))
    );
}
