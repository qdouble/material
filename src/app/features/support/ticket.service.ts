/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from '../../services/constants';
import { Ticket, TicketMessage, AddTicketResponse, AddMessageResponse, CloseTicketResponse, GetTicketResponse, GetTicketsResponse, MarkTicketAsReadResponse } from './ticket.model';
import { RequestBase } from '../../services/request-base';

@Injectable()
export class TicketService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  addMessage(message: TicketMessage): Observable<AddMessageResponse> {
    return this.http.post(`${API_USER_URL}/addTicketMessage`, message, this.options)
      .map(res => res.json());
  }

  addTicket(ticket: Ticket): Observable<AddTicketResponse> {
    return this.http.post(`${API_USER_URL}/addTicket`, ticket, this.options)
      .map(res => res.json());
  }

  closeTicket(ticket: { id: string, close: boolean }): Observable<CloseTicketResponse> {
    return this.http.get(`${API_USER_URL}/closeTicket?id=${ticket.id}&close=${ticket.close}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getTicket(id: string): Observable<GetTicketResponse> {
    return this.http.get(`${API_USER_URL}/getTicket?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getTickets(): Observable<GetTicketsResponse> {
    return this.http.get(`${API_USER_URL}/getTickets`, this.optionsNoPre)
      .map(res => res.json());
  }

  markTicketAsRead(ticket: { id: string, mark: boolean }): Observable<MarkTicketAsReadResponse> {
    return this.http.get(`${API_USER_URL}/markTicketAsRead?id=${ticket.id}&mark=${ticket.mark}`, this.optionsNoPre)
      .map(res => res.json());
  }
}
