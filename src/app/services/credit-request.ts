/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { CreditRequest } from '../models/credit-request';
import { RequestBase } from './request-base';

@Injectable()
export class CreditRequestService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  addCreditRequest(creditRequest: CreditRequest): Observable<Response> {
    return this.http.post(`${API_USER_URL}/addCreditRequest`, creditRequest, this.options)
      .map(res => res.json());
  }

  getCreditRequest(id: string): Observable<CreditRequest> {
    return this.http.get(`${API_USER_URL}/getCreditRequest?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getCreditRequests(): Observable<CreditRequest[]> {
    return this.http.get(`${API_USER_URL}/getCreditRequests`, this.optionsNoPre)
      .map(res => res.json());
  }

  getOfferClicks(): Observable<CreditRequest[]> {
    return this.http.get(`${API_USER_URL}/getOfferClicks`, this.optionsNoPre)
      .map(res => res.json());
  }

}
