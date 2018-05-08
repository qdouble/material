/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';
import { ContactUsResponse, GetVersionResponse, GetScriptsToLoadResponse, GetIPInfoResponse, GetSocialProofResponse, SocialProofSettings } from '../models/ui';

@Injectable()
export class UIService extends RequestBase {

  constructor(public http: HttpClient) {
    super(http);
  }

  addInvalidCountry(ipInfo: GetIPInfoResponse) {
    return this.http.post<{ override?: string }>
      (`${API_USER_URL}/addInvalidCountry`, ipInfo, this.options);
  }

  addUserIDToSocket(id: string) {
    return this.http.get
      (`${API_USER_URL}/socket/addUserIDToSocket?id=${id}`, { ...this.optionsNoPre, responseType: 'text' });
  }

  contactUs(contact: { email: string, subject: string, question: string }) {
    return this.http.post<ContactUsResponse>
      (`${API_USER_URL}/contactUs`, contact, this.options);
  }

  getIPInfo(ip: string) {
    return this.http.jsonp<GetIPInfoResponse>
      (`https://extreme-ip-lookup.com/json/`, 'callback');
  }

  getVersion() {
    return this.http.get<GetVersionResponse>
      (`/version.json?nocache=${(new Date()).getTime()}`, this.optionsNoPre);
  }

  getScriptsToLoad() {
    return this.http.get<GetScriptsToLoadResponse>
      (`${API_USER_URL}/getScriptsToLoad`, this.optionsNoPre);
  }

  getSocialProof(type: string) {
    return this.http.get<GetSocialProofResponse>
      (`${API_USER_URL}/getSocialProof?type=${type}`, this.optionsNoPre);
  }
  getSocialProofSettings() {
    return this.http.get<SocialProofSettings>
      (`${API_USER_URL}/getSocialProofSettings`, this.optionsNoPre);
  }
}
