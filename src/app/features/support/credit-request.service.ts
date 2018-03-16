/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from '../../services/constants';
import { CreditRequest, GetCreditRequestResponse, GetCreditRequestsResponse } from './credit-request.model';
import { RequestBase } from '../../services/request-base';
import { GetOfferClicksResponse } from './offer-click.model';

@Injectable()
export class CreditRequestService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  addCreditRequest(creditRequest: CreditRequest): Observable<GetCreditRequestResponse> {
    return this.http.post(`${API_USER_URL}/addCreditRequest`, creditRequest, this.options)
      .map(res => res.json());
  }

  editCreditRequest(creditRequest: CreditRequest): Observable<GetCreditRequestResponse> {
    return this.http.post(`${API_USER_URL}/editCreditRequest`, creditRequest, this.options)
      .map(res => res.json());
  }

  getCreditRequest(id: string): Observable<GetCreditRequestResponse> {
    return this.http.get(`${API_USER_URL}/getCreditRequest?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getCreditRequests(): Observable<GetCreditRequestsResponse> {
    return this.http.get(`${API_USER_URL}/getCreditRequests`, this.optionsNoPre)
      .map(res => res.json());
  }

  getOfferClicks(): Observable<GetOfferClicksResponse> {
    return this.http.get(`${API_USER_URL}/getOfferClicks`, this.optionsNoPre)
      .map(res => res.json());
  }

}
