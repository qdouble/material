import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request-base';
import { Offer } from '../models';
import { API_USER_URL } from './constants';

@Injectable()
export class OfferService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get(`${API_USER_URL}/getOffers`, this.optionsNoPre)
      .map(res => res.json());
  }
}
