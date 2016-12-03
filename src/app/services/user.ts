/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_ADMIN_URL, API_USER_URL } from './constants';
import { User } from '../models/user';
import { RequestBase } from './request-base';

@Injectable()
export class UserService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  changeSelectedPrize(id: string): Observable<User> {
    return this.http.get(`${API_USER_URL}/changeSelectedPrize?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkEmail(email: string): Observable<User> {
    return this.http.get(`${API_USER_URL}/checkUserEmail?email=${email}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkLoggedIn(): Observable<string> {
    return this.http.get(`${API_USER_URL}/loggedIn`, this.optionsNoPre)
      .map(res => res.text());
  }

  dismissProfileChanges(): Observable<any> {
    return this.http.get(`${API_USER_URL}/dismissProfileChanges`, this.optionsNoPre)
      .map(res => res.text());
  }

  getProfile(): Observable<User> {
    return this.http.get(`${API_USER_URL}/getProfile`, this.optionsNoPre)
      .map(res => res.json());
  }

  getReferral(id: string): Observable<User> {
    return this.http.get(`${API_USER_URL}/getReferral?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  loginAdmin(user: User): Observable<User> {
    return this.http.post(`${API_ADMIN_URL}/login`, user, this.options)
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

  setSponsor(sponsorUsername: string): Observable<User> {
    return this.http.post(`${API_USER_URL}/setSponsor`, { sponsorUsername: sponsorUsername }, this.options)
      .map(res => res.json());
  }

  updateProfile(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/updateProfile`, user, this.options)
      .map(res => res.json());
  }
}
