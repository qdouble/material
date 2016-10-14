import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { Ticket } from '../models';
import { RequestBase } from './request-base';

@Injectable()
export class TicketService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  closeTicket(id: string): Observable<Ticket> {
    return this.http.get(`${API_USER_URL}/closeTicket`, this.optionsNoPre)
      .map(res => res.json());
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get(`${API_USER_URL}/getTickets`, this.optionsNoPre)
      .map(res => res.json());
  }

  submitTicket(ticket: Ticket): Observable<Response> {
    return this.http.get(`${API_USER_URL}/submitTicket`, this.optionsNoPre)
      .map(res => res.json());
  }

}
