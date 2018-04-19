/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';
import { ContactUsResponse, GetVersionResponse, GetScriptsToLoadResponse } from '../models/ui';

@Injectable()
export class UIService extends RequestBase {

  constructor(public http: HttpClient) {
    super(http);
  }

  addUserIDToSocket(id: string) {
    return this.http.get
      (`${API_USER_URL}/socket/addUserIDToSocket?id=${id}`, { ...this.optionsNoPre, responseType: 'text' });
  }

  contactUs(contact: { email: string, subject: string, question: string }) {
    return this.http.post<ContactUsResponse>
      (`${API_USER_URL}/contactUs`, contact, this.options);
  }

  getVersion() {
    return this.http.get<GetVersionResponse>
      (`/version.json?nocache=${(new Date()).getTime()}`, this.optionsNoPre);
  }

  getScriptsToLoad() {
    return this.http.get<GetScriptsToLoadResponse>
      (`${API_USER_URL}/getScriptsToLoad`, this.optionsNoPre);
  }

}
