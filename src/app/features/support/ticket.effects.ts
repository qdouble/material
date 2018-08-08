/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AddNotify } from '../../actions/notify';
import {
  AddMessage,
  AddMessageFail,
  AddMessageSuccess,
  AddTicket,
  AddTicketFail,
  AddTicketSuccess,
  CloseTicket,
  CloseTicketFail,
  CloseTicketSuccess,
  GetTicket,
  GetTicketFail,
  GetTicketSuccess,
  GetTicketsFail,
  GetTicketsSuccess,
  MarkTicketAsRead,
  MarkTicketAsReadFail,
  MarkTicketAsReadSuccess,
  TicketActionTypes
} from './ticket.actions';
import { TicketService } from './ticket.service';

@Injectable()
export class TicketEffects {
  constructor(public actions$: Actions, private ticketService: TicketService) {}

  @Effect()
  addMessage$ = this.actions$.pipe(
    ofType(TicketActionTypes.AddMessage),
    map((action: AddMessage) => action.payload),
    switchMap(message =>
      this.ticketService
        .addMessage(message)
        .pipe(
          map(res => new AddMessageSuccess(res)),
          catchError(err => of(new AddMessageFail(err)))
        )
    )
  );

  @Effect()
  addTicket$ = this.actions$.pipe(
    ofType(TicketActionTypes.AddTicket),
    map((action: AddTicket) => action.payload),
    switchMap(ticket =>
      this.ticketService
        .addTicket(ticket)
        .pipe(
          switchMap(res => concat(of(new AddTicketSuccess(res)), of(new AddNotify(res)))),
          catchError(err => of(new AddTicketFail(err)))
        )
    )
  );

  @Effect()
  closeTicket$ = this.actions$.pipe(
    ofType(TicketActionTypes.CloseTicket),
    map((action: CloseTicket) => action.payload),
    switchMap(id =>
      this.ticketService
        .closeTicket(id)
        .pipe(
          map(res => new CloseTicketSuccess(res)),
          catchError(err => of(new CloseTicketFail(err)))
        )
    )
  );

  @Effect()
  getTicket$ = this.actions$.pipe(
    ofType(TicketActionTypes.GetTicket),
    map((action: GetTicket) => action.payload),
    switchMap(id =>
      this.ticketService
        .getTicket(id)
        .pipe(map(res => new GetTicketSuccess(res)), catchError(err => of(new GetTicketFail(err))))
    )
  );

  @Effect()
  getTickets$ = this.actions$.pipe(
    ofType(TicketActionTypes.GetTickets),
    switchMap(email =>
      this.ticketService
        .getTickets()
        .pipe(
          map(res => new GetTicketsSuccess(res)),
          catchError(err => of(new GetTicketsFail(err)))
        )
    )
  );

  @Effect()
  markTicketAsRead$ = this.actions$.pipe(
    ofType(TicketActionTypes.MarkTicketAsRead),
    map((action: MarkTicketAsRead) => action.payload),
    switchMap(ticket =>
      this.ticketService
        .markTicketAsRead(ticket)
        .pipe(
          map(res => new MarkTicketAsReadSuccess(res)),
          catchError(err => of(new MarkTicketAsReadFail(err)))
        )
    )
  );
}
