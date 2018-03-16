import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { GetCountriesResponse } from '../models/country';
import { RequestBase } from './request-base';

@Injectable()
export class CountryService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getCountries(): Observable<GetCountriesResponse> {
    return this.http.get(`${API_USER_URL}/getCountries`, this.optionsNoPre)
      .map(res => res.json());
  }
}
