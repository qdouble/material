import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { GetOfferResponse, GetOffersResponse, GetOffersUpdatedAtResponse } from '../models/offer';
import { RequestBase } from './request-base';

@Injectable()
export class OfferService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  getOffer(id: string) {
    return this.http.get<GetOfferResponse>
      (`${API_USER_URL}/getOffer?id=${id}`, this.optionsNoPre);
  }

  getOffers() {
    return this.http.get<GetOffersResponse>
      (`${API_USER_URL}/getOffers`, this.optionsNoPre);
  }

  getOffersUpdatedAt() {
    return this.http.get<GetOffersUpdatedAtResponse>
      (`${API_USER_URL}/getOffersUpdatedAt`, this.optionsNoPre);
  }

  getViewOffers() {
    return this.http.get<GetOffersResponse>
      (`${API_USER_URL}/getViewOffers`, this.optionsNoPre);
  }
}
