/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_USER_URL } from '../../services/constants';
import {
  CreditRequest,
  GetCreditRequestResponse,
  GetCreditRequestsResponse
} from './credit-request.model';
import { RequestBase } from '../../services/request-base';
import { GetOfferClicksResponse } from './offer-click.model';

@Injectable()
export class CreditRequestService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  addCreditRequest(creditRequest: CreditRequest) {
    return this.http.post<GetCreditRequestResponse>(
      `${API_USER_URL}/addCreditRequest`,
      creditRequest,
      this.options
    );
  }

  editCreditRequest(creditRequest: CreditRequest) {
    return this.http.post<GetCreditRequestResponse>(
      `${API_USER_URL}/editCreditRequest`,
      creditRequest,
      this.options
    );
  }

  getCreditRequest(id: string) {
    return this.http.get<GetCreditRequestResponse>(
      `${API_USER_URL}/getCreditRequest?id=${id}`,
      this.optionsNoPre
    );
  }

  getCreditRequests() {
    return this.http.get<GetCreditRequestsResponse>(
      `${API_USER_URL}/getCreditRequests`,
      this.optionsNoPre
    );
  }

  getOfferClicks() {
    return this.http.get<GetOfferClicksResponse>(
      `${API_USER_URL}/getOfferClicks`,
      this.optionsNoPre
    );
  }
}
