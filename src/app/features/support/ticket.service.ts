/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from '../../services/constants';
import { Ticket, TicketMessage } from './ticket.model';
import { RequestBase } from '../../services/request-base';

@Injectable()
export class TicketService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  addMessage(message: TicketMessage): Observable<TicketMessage> {
    return this.http.post(`${API_USER_URL}/addTicketMessage`, message, this.options)
      .map(res => res.json());
  }

  addTicket(ticket: Ticket): Observable<Response> {
    return this.http.post(`${API_USER_URL}/addTicket`, ticket, this.options)
      .map(res => res.json());
  }

  closeTicket(ticket: { id: string, close: boolean }): Observable<Ticket> {
    return this.http.get(`${API_USER_URL}/closeTicket?id=${ticket.id}&close=${ticket.close}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http.get(`${API_USER_URL}/getTicket?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get(`${API_USER_URL}/getTickets`, this.optionsNoPre)
      .map(res => res.json());
  }

  markTicketAsRead(ticket: { id: string, mark: boolean }): Observable<Ticket> {
    return this.http.get(`${API_USER_URL}/markTicketAsRead?id=${ticket.id}&mark=${ticket.mark}`, this.optionsNoPre)
      .map(res => res.json());
  }
}
