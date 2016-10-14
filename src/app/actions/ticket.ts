/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Ticket } from '../models';

@Injectable()

export class TicketActions {
  static CLOSE_TICKET = '[Ticket] Close Ticket';
  closeTicket(id: string): Action {
    return {
      type: TicketActions.CLOSE_TICKET,
      payload: id
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

  static GET_TICKET = '[Ticket] Select Ticket';
  getTicket(id: string): Action {
    return {
      type: TicketActions.GET_TICKET,
      payload: id
    };
  }

  static GET_TICKET_FAIL = '[Ticket] Select Ticket';
  getTicketFail(err: Error): Action {
    return {
      type: TicketActions.GET_TICKET,
      payload: err
    };
  }

  static GET_TICKET_SUCCESS = '[Ticket] Get Ticket Success';
  getTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.GET_TICKETS_SUCCESS,
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

  static SUBMIT_TICKET = '[Ticket] Submit Ticket';
  submitTicket(ticket: Ticket): Action {
    return {
      type: TicketActions.SUBMIT_TICKET,
      payload: ticket
    };
  }

  static SUBMIT_TICKET_FAIL = '[Ticket] Select Ticket';
  submitTicketFail(err: Error): Action {
    return {
      type: TicketActions.SUBMIT_TICKET_FAIL,
      payload: err
    };
  }

  static SUBMIT_TICKET_SUCCESS = '[Ticket] Get Ticket Success';
  submitTicketSuccess(ticket: Ticket): Action {
    return {
      type: TicketActions.SUBMIT_TICKET_SUCCESS,
      payload: ticket
    };
  }
}
