import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_USER_URL } from './constants';
import { GetCountriesResponse } from '../models/country';
import { RequestBase } from './request-base';

@Injectable()
export class CountryService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  getCountries() {
    return this.http.get<GetCountriesResponse>(`${API_USER_URL}/getCountries`, this.optionsNoPre);
  }
}
