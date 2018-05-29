/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from '../../services/constants';
import {
  Ticket,
  TicketMessage,
  AddTicketResponse,
  AddMessageResponse,
  CloseTicketResponse,
  GetTicketResponse,
  GetTicketsResponse,
  MarkTicketAsReadResponse
} from './ticket.model';
import { RequestBase } from '../../services/request-base';

@Injectable()
export class TicketService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  addMessage(message: TicketMessage) {
    return this.http.post<AddMessageResponse>(
      `${API_USER_URL}/addTicketMessage`,
      message,
      this.options
    );
  }

  addTicket(ticket: Ticket) {
    return this.http.post<AddTicketResponse>(`${API_USER_URL}/addTicket`, ticket, this.options);
  }

  closeTicket(ticket: { id: string; close: boolean }) {
    return this.http.get<CloseTicketResponse>(
      `${API_USER_URL}/closeTicket?id=${ticket.id}&close=${ticket.close}`,
      this.optionsNoPre
    );
  }

  getTicket(id: string) {
    return this.http.get<GetTicketResponse>(
      `${API_USER_URL}/getTicket?id=${id}`,
      this.optionsNoPre
    );
  }

  getTickets() {
    return this.http.get<GetTicketsResponse>(`${API_USER_URL}/getTickets`, this.optionsNoPre);
  }

  markTicketAsRead(ticket: { id: string; mark: boolean }) {
    return this.http.get<MarkTicketAsReadResponse>(
      `${API_USER_URL}/markTicketAsRead?id=${ticket.id}&mark=${ticket.mark}`,
      this.optionsNoPre
    );
  }
}
