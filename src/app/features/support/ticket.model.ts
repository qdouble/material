import { GenericResponse } from '../../models/generic-response';

export interface Ticket {
  readonly id: string;
  readonly subject?: string;
  readonly question?: string;
  readonly messages?: TicketMessage[];
  readonly closed?: boolean;
  readonly adminOrigin?: boolean;
  readonly readByAdmin?: boolean;
  readonly readByUser?: boolean;
  readonly entries?: number;
  readonly lastEntry?: Date;
  readonly lastEntryBy?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface TicketMessage {
  readonly id?: string;
  readonly message?: string;
  readonly ticketId?: string;
  readonly adminName?: string;
  readonly updatedAt?: Date;
}

export interface AddMessageResponse extends GenericResponse {
  ticketMessage: TicketMessage;
  entries: number;
  lastEntry: Date;
  lastEntryBy: string;
}

export interface AddTicketResponse extends GenericResponse {
  ticket: Ticket;
  id: string;
}

export interface CloseTicketResponse extends GenericResponse {
  id: string;
  closed: boolean;
}

export interface GetTicketResponse extends GenericResponse {
  ticket: Ticket;
}

export interface GetTicketsResponse extends GenericResponse {
  tickets: Ticket[];
}

export interface MarkTicketAsReadResponse extends GenericResponse {
  id: string;
  mark: boolean;
}

export interface SortByModel {
  sortBy: string;
  reverse: boolean;
}
