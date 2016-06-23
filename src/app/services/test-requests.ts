import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import { API_ADMIN_URL, API_USER_URL } from './constants';

@Injectable()
export class TestRequestService {
  constructor(private http: Http) { }
  checkLoginStatus(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/loggedin`)
      .map(res => res.json())
  }
  showAllUsers(): Observable<Response> {
    return this.http.get(`${API_USER_URL}/showAllUsers`)
      .map(res => res.json())
  }
}