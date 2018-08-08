/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';

import {
  Ticket,
  TicketMessage,
  AddMessageResponse,
  AddTicketResponse,
  CloseTicketResponse,
  GetTicketResponse,
  GetTicketsResponse,
  MarkTicketAsReadResponse,
  SortByModel
} from './ticket.model';

export enum TicketActionTypes {
  AddMessage = '[Ticket] Add Message',
  AddMessageFail = '[Ticket] Add Message Fail',
  AddMessageSuccess = '[Ticket] Add Message Success',
  AddTicket = '[Ticket] Add Ticket',
  AddTicketFail = '[Ticket] Add Ticket Fail',
  AddTicketSuccess = '[Ticket] Add Ticket Success',
  CloseTicket = '[Ticket] Close Ticket',
  CloseTicketFail = '[Ticket] Close Ticket Fail',
  CloseTicketSuccess = '[Ticket] Close Ticket Success',
  GetTicket = '[Ticket] Get Ticket',
  GetTicketFail = '[Ticket] Get Ticket Fail',
  GetTicketSuccess = '[Ticket] Get Ticket Success',
  GetTickets = '[Tickets] Get Tickets',
  GetTicketsFail = '[Tickets] Get Tickets Fail',
  GetTicketsSuccess = '[Tickets] Get Tickets Success',
  MarkTicketAsRead = '[Tickets] Mark Ticket As Read',
  MarkTicketAsReadFail = '[Tickets] Mark Ticket As Read Fail',
  MarkTicketAsReadSuccess = '[Tickets] Mark Ticket As Read Success',
  SortBy = '[Tickets] Sort By',
  UpdateTicket = '[Ticket] Update Ticket'
}

export class AddMessage implements Action {
  readonly type = TicketActionTypes.AddMessage;

  constructor(public payload: TicketMessage) {}
}

export class AddMessageFail implements Action {
  readonly type = TicketActionTypes.AddMessageFail;

  constructor(public payload: Error) {}
}

export class AddMessageSuccess implements Action {
  readonly type = TicketActionTypes.AddMessageSuccess;

  constructor(public payload: AddMessageResponse) {}
}

export class AddTicket implements Action {
  readonly type = TicketActionTypes.AddTicket;

  constructor(public payload: Ticket) {}
}

export class AddTicketFail implements Action {
  readonly type = TicketActionTypes.AddTicketFail;

  constructor(public payload: Error) {}
}

export class AddTicketSuccess implements Action {
  readonly type = TicketActionTypes.AddTicketSuccess;

  constructor(public payload: AddTicketResponse) {}
}

export class CloseTicket implements Action {
  readonly type = TicketActionTypes.CloseTicket;

  constructor(public payload: { id: string; close: boolean }) {}
}

export class CloseTicketFail implements Action {
  readonly type = TicketActionTypes.CloseTicketFail;

  constructor(public payload: Error) {}
}

export class CloseTicketSuccess implements Action {
  readonly type = TicketActionTypes.CloseTicketSuccess;

  constructor(public payload: CloseTicketResponse) {}
}

export class GetTicket implements Action {
  readonly type = TicketActionTypes.GetTicket;

  constructor(public payload: string) {}
}

export class GetTicketFail implements Action {
  readonly type = TicketActionTypes.GetTicketFail;

  constructor(public payload: Error) {}
}

export class GetTicketSuccess implements Action {
  readonly type = TicketActionTypes.GetTicketSuccess;

  constructor(public payload: GetTicketResponse) {}
}

export class GetTickets implements Action {
  readonly type = TicketActionTypes.GetTickets;
}

export class GetTicketsFail implements Action {
  readonly type = TicketActionTypes.GetTicketsFail;

  constructor(public payload: Error) {}
}

export class GetTicketsSuccess implements Action {
  readonly type = TicketActionTypes.GetTicketsSuccess;

  constructor(public payload: GetTicketsResponse) {}
}

export class MarkTicketAsRead implements Action {
  readonly type = TicketActionTypes.MarkTicketAsRead;

  constructor(public payload: { id: string; mark: boolean }) {}
}

export class MarkTicketAsReadFail implements Action {
  readonly type = TicketActionTypes.MarkTicketAsReadFail;

  constructor(public payload: Error) {}
}

export class MarkTicketAsReadSuccess implements Action {
  readonly type = TicketActionTypes.MarkTicketAsReadSuccess;

  constructor(public payload: MarkTicketAsReadResponse) {}
}

export class SortBy implements Action {
  readonly type = TicketActionTypes.SortBy;

  constructor(public payload: SortByModel) {}
}

export class UpdateTicket implements Action {
  readonly type = TicketActionTypes.UpdateTicket;

  constructor(public payload: { ticket: Ticket }) {}
}

export type TicketActions =
  | AddMessage
  | AddMessageFail
  | AddMessageSuccess
  | AddTicket
  | AddTicketFail
  | AddTicketSuccess
  | CloseTicket
  | CloseTicketFail
  | CloseTicketSuccess
  | GetTicket
  | GetTicketFail
  | GetTicketSuccess
  | GetTickets
  | GetTicketsFail
  | GetTicketsSuccess
  | MarkTicketAsRead
  | MarkTicketAsReadFail
  | MarkTicketAsReadSuccess
  | SortBy
  | UpdateTicket;
