import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_ADMIN_URL, API_USER_URL } from './constants';

@Injectable()
export class TestRequestService {
  options = new RequestOptions({
    withCredentials: true
  });
  constructor(private http: Http) { }
  checkLoginStatus(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/loggedin`, this.options)
      .map(res => res.json());
  }
  getAffiliates(): Observable<Response> {
    return this.http.get(`${API_ADMIN_URL}/getAffiliates`, this.options)
      .map(res => res.json());
  }
  showAllUsers(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/showAllUsers`, this.options)
      .map(res => res.json());
  }
};
