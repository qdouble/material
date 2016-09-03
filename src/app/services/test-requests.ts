import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_ADMIN_URL, API_USER_URL } from './constants';
import { RequestBase } from './request-base';

@Injectable()
export class TestRequestService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }
  checkLoginStatus(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/loggedin`, this.optionsNoPre)
      .map(res => res.json());
  }
  getAffiliates(): Observable<Response> {
    return this.http.get(`${API_ADMIN_URL}/getAffiliates`, this.optionsNoPre)
      .map(res => res.json());
  }
  showAllUsers(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/showAllUsers`, this.optionsNoPre)
      .map(res => res.json());
  }
};
