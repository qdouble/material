import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { GetPrizesResponse } from '../models/prize';
import { RequestBase } from './request-base';

@Injectable()
export class PrizeService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  getPrizes() {
    return this.http.get<GetPrizesResponse>
      (`${API_USER_URL}/getPrizes`, this.optionsNoPre);
  }
}
