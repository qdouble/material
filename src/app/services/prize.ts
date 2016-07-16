import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request-base';
import { User } from '../models';
import { API_USER_URL } from './constants';

@Injectable()
export class PrizeService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getPrizes(): Observable<User> {
    return this.http.get(`${API_USER_URL}/getPrizes`, this.optionsNoPre)
      .map(res => res.json());
  }
}
