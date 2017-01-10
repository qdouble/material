/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';

@Injectable()
export class UIService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  contactUs(contact: { email: string, subject: string, question: string }): Observable<Response> {
    return this.http.post(`${API_USER_URL}/contactUs`, contact, this.options)
      .map(res => res.json());
  }

  getVersion(): Observable<Response> {
    return this.http.get(`/version.json?nocache=${(new Date()).getTime()}`, this.optionsNoPre)
      .map(res => res.json());
  }

}
