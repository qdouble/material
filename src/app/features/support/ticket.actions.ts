/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Ticket, TicketMessage } from './ticket.model';

@Injectable()

export class TicketActions {

  static ADD_MESSAGE = '[Ticket] Add Message';
  addMessage(message: TicketMessage): Action {
    return {
      type: TicketActions.ADD_MESSAGE,
      payload: message
    };
  }

  static ADD_MESSAGE_FAIL = '[Ticket] Add Message Fail';
  addMessageFail(err: Error): Action {
    return {
      type: TicketActions.ADD_MESSAGE_FAIL,
      payload: err
    };
  }

  static ADD_MESSAGE_SUCCESS = '[Ticket] Add Message Success';
  addMessageSuccess(message: TicketMessage): Action {
    return {
      type: TicketActions.ADD_MESSAGE_SUCCESS,
      payload: message
    };
  }

  static ADD_TICKET = '[Ticket] Add Ticket';
  addTicket(ticket: Ticket): Action {
    return {
      type: TicketActions.ADD_TICKET,
      payload: ticket
    };
  }

  static ADD_TICKET_FAIL = '[Ticket] Add Ticket Fail';
  addTicketFail(err: Error): Action {
    return {
      type: TicketActions.ADD_TICKET_FAIL,
      payload: err
    };
  }

  static ADD_TICKET_SUCCESS = '[Ticket] Add Ticket Success';
  addTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.ADD_TICKET_SUCCESS,
      payload: ticket
    };
  }

  static CLOSE_TICKET = '[Ticket] Close Ticket';
  closeTicket(ticket: { id: string, close: boolean }): Action {
    return {
      type: TicketActions.CLOSE_TICKET,
      payload: ticket
    };
  }

  static CLOSE_TICKET_FAIL = '[Ticket] Close Ticket Fail';
  closeTicketFail(err: Error): Action {
    return {
      type: TicketActions.CLOSE_TICKET_FAIL,
      payload: err
    };
  }

  static CLOSE_TICKET_SUCCESS = '[Ticket] Close Ticket Success';
  closeTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.CLOSE_TICKET_SUCCESS,
      payload: ticket
    };
  }

  static EDIT_TICKET = '[Ticket] Edit Ticket';
  editTicket(ticket: Ticket): Action {
    return {
      type: TicketActions.EDIT_TICKET,
      payload: ticket
    };
  }

  static EDIT_TICKET_FAIL = '[Ticket] Edit Ticket Fail';
  editTicketFail(err: Error): Action {
    return {
      type: TicketActions.EDIT_TICKET_FAIL,
      payload: err
    };
  }

  static EDIT_TICKET_SUCCESS = '[Ticket] Edit Ticket Success';
  editTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.EDIT_TICKET_SUCCESS,
      payload: ticket
    };
  }

  static GET_TICKET = '[Ticket] Get Ticket';
  getTicket(id: string): Action {
    return {
      type: TicketActions.GET_TICKET,
      payload: id
    };
  }

  static GET_TICKET_FAIL = '[Ticket] Get Ticket Fail';
  getTicketFail(err: Error): Action {
    return {
      type: TicketActions.GET_TICKET_FAIL,
      payload: err
    };
  }

  static GET_TICKET_SUCCESS = '[Ticket] Get Ticket Success';
  getTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.GET_TICKET_SUCCESS,
      payload: ticket
    };
  }

  static GET_TICKETS = '[Ticket] Get Tickets';
  getTickets(): Action {
    return {
      type: TicketActions.GET_TICKETS
    };
  }

  static GET_TICKETS_FAIL = '[Ticket] Get Tickets Fail';
  getTicketsFail(err: Error): Action {
    return {
      type: TicketActions.GET_TICKETS_FAIL,
      payload: err
    };
  }

  static GET_TICKETS_SUCCESS = '[Ticket] Get Tickets Success';
  getTicketsSuccess(tickets: Ticket[]): Action {
    return {
      type: TicketActions.GET_TICKETS_SUCCESS,
      payload: tickets
    };
  }

  static MARK_TICKET_AS_READ = '[Support] Mark Ticket As Read';
  markTicketAsRead(ticket: { id: string, mark: boolean }): Action {
    return {
      type: TicketActions.MARK_TICKET_AS_READ,
      payload: ticket
    };
  }

  static MARK_TICKET_AS_READ_FAIL = '[Support] Mark Ticket As Read Fail';
  markTicketAsReadFail(err: Error): Action {
    return {
      type: TicketActions.MARK_TICKET_AS_READ_FAIL,
      payload: err
    };
  }

  static MARK_TICKET_AS_READ_SUCCESS = '[Support] Mark Ticket As Read Success';
  markTicketAsReadSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.MARK_TICKET_AS_READ_SUCCESS,
      payload: ticket
    };
  }

  static SORT_BY = '[Offer] Sort Tickets By';
  sortBy(sort: { sortBy: string, reverse: boolean }): Action {
    return {
      type: TicketActions.SORT_BY,
      payload: sort
    };
  }
}
