/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';
import { ContactUsResponse, GetVersionResponse } from '../models/ui';

@Injectable()
export class UIService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  addUserIDToSocket(id: string): Observable<string> {
    return this.http.get(`${API_USER_URL}/socket/addUserIDToSocket?id=${id}`, this.optionsNoPre)
      .map(res => res.text());
  }

  contactUs(contact: { email: string, subject: string, question: string }): Observable<ContactUsResponse> {
    return this.http.post(`${API_USER_URL}/contactUs`, contact, this.options)
      .map(res => res.json());
  }

  getVersion(): Observable<GetVersionResponse> {
    return this.http.get(`/version.json?nocache=${(new Date()).getTime()}`, this.optionsNoPre)
      .map(res => res.json());
  }

}
