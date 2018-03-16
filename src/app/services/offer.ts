import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { GetOfferResponse, GetOffersResponse, GetOffersUpdatedAtResponse } from '../models/offer';
import { RequestBase } from './request-base';

@Injectable()
export class OfferService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getOffer(id: string): Observable<GetOfferResponse> {
    return this.http.get(`${API_USER_URL}/getOffer?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getOffers(): Observable<GetOffersResponse> {
    return this.http.get(`${API_USER_URL}/getOffers`, this.optionsNoPre)
      .map(res => res.json());
  }

  getOffersUpdatedAt(): Observable<GetOffersUpdatedAtResponse> {
    return this.http.get(`${API_USER_URL}/getOffersUpdatedAt`, this.optionsNoPre)
      .map(res => res.json());
  }

  getViewOffers(): Observable<GetOffersResponse> {
    return this.http.get(`${API_USER_URL}/getViewOffers`, this.optionsNoPre)
      .map(res => res.json());
  }
}
