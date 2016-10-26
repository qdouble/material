import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { User } from '../models/user';
import { RequestBase } from './request-base';

@Injectable()
export class UserService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  checkEmail(email: string): Observable<User> {
    return this.http.get(`${API_USER_URL}/checkUserEmail?email=${email}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkLoggedIn(): Observable<string> {
    return this.http.get(`${API_USER_URL}/loggedIn`, this.optionsNoPre)
      .map(res => res.text());
  }

  getProfile(): Observable<User> {
    return this.http.get(`${API_USER_URL}/getProfile`, this.optionsNoPre)
      .map(res => res.json());
  }

  loginUser(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/login`, user, this.options)
      .map(res => res.json());
  }

  logout(): Observable<User> {
    return this.http.get(`${API_USER_URL}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }

  recordClick(offerId: string): Observable<string> {
    return this.http.post(`${API_USER_URL}/recordClick`, { 'id': offerId }, this.options)
      .map(res => res.json());
  }

  registerUser(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/registerUser`, user, this.options)
      .map(res => res.json());
  }

  updateProfile(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/updateProfile`, user, this.options)
      .map(res => res.json());
  }
}
