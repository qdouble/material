import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import { API_ADMIN_URL, API_USER_URL } from './constants';

@Injectable()
export class UserService {
  headers = new Headers();
  noPreFlightHeaders = new Headers();
  options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  optionsNoPre = new RequestOptions({
    headers: this.noPreFlightHeaders,
    withCredentials: true
  });
  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
  }
  checkEmail(email: string): Observable<User> {
    return this.http.get(`${API_USER_URL}/checkUserEmail?email=${email}`, this.options)
      .map(res => res.json());
  }

  checkLoggedIn(): Observable<any> {
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

  registerUser(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/registerUser`, user, this.options)
      .map(res => res.json());
  }

  updateProfile(user: User): Observable<User> {
    return this.http.post(`${API_USER_URL}/updateProfile`, user, this.options)
      .map(res => res.json());
  }
}
