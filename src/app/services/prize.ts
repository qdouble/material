import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { GetPrizesResponse } from '../models/prize';
import { RequestBase } from './request-base';

@Injectable()
export class PrizeService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getPrizes(): Observable<GetPrizesResponse> {
    return this.http.get(`${API_USER_URL}/getPrizes`, this.optionsNoPre)
      .map(res => res.json());
  }
}
