/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_ADMIN_URL, API_USER_URL } from './constants';
import { User, GetProfileResponse, GetReferralResponse, RecordClickResponse, HideReferralsResponse } from '../models/user';
import { RequestBase } from './request-base';
import { ChangeSelectedPrizeResponse, CheckIfUserUpdatedAtResponse, CheckIPMatchResponse, CheckReferrerUsernameResponse, DismissProfileChangesResponse, RemoveReferralsResponse, SetSponsorResponse } from '../models/prize';
import { GenericResponse } from '../models/generic-response';

@Injectable()
export class UserService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  changeSelectedPrize(id: string): Observable<ChangeSelectedPrizeResponse> {
    return this.http.get(`${API_USER_URL}/changeSelectedPrize?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkEmail(email: string): Observable<GenericResponse> {
    return this.http.get(`${API_USER_URL}/checkUserEmail?email=${email}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkIfUserUpdated(): Observable<CheckIfUserUpdatedAtResponse> {
    return this.http.get(`${API_USER_URL}/checkIfUserUpdated`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkIPMatch(sponsor: string): Observable<CheckIPMatchResponse> {
    return this.http.get(`${API_USER_URL}/checkIPMatch?referredBy=${sponsor}`, this.optionsNoPre)
      .map(res => res.json());
  }

  checkLoggedIn(): Observable<string> {
    return this.http.get(`${API_USER_URL}/loggedIn`, this.optionsNoPre)
      .map(res => res.text());
  }

  checkReferrerUsername(username: string): Observable<CheckReferrerUsernameResponse> {
    return this.http.get(`${API_USER_URL}/checkReferrerUsername?username=${username}`, this.optionsNoPre)
      .map(res => res.json());
  }

  dismissProfileChanges(): Observable<DismissProfileChangesResponse> {
    return this.http.get(`${API_USER_URL}/dismissProfileChanges`, this.optionsNoPre)
      .map(res => res.json());
  }

  forgotPassword(email: string): Observable<GenericResponse> {
    return this.http.post(`${API_USER_URL}/forgotPassword`, { email: email }, this.options)
      .map(res => res.json());
  }

  hideReferrals(hideRefs: { ids: string[], hide: boolean }): Observable<HideReferralsResponse> {
    return this.http.post(`${API_USER_URL}/hideReferrals`, hideRefs, this.options)
      .map(res => res.json());
  }

  getProfile(): Observable<GetProfileResponse> {
    return this.http.get(`${API_USER_URL}/getProfile`, this.optionsNoPre)
      .map(res => res.json());
  }

  getReferral(id: string): Observable<GetReferralResponse> {
    return this.http.get(`${API_USER_URL}/getReferral?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  loginAdmin(user: User): Observable<GenericResponse> {
    return this.http.post(`${API_ADMIN_URL}/login`, user, this.options)
      .map(res => res.json());
  }

  loginUser(user: User): Observable<GenericResponse> {
    return this.http.post(`${API_USER_URL}/login`, user, this.options)
      .map(res => res.json());
  }

  logout(): Observable<string> {
    return this.http.get(`${API_USER_URL}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }

  recordClick(offerId: string): Observable<RecordClickResponse> {
    return this.http.post(`${API_USER_URL}/recordClick`, { 'id': offerId }, this.options)
      .retry()
      .map(res => res.json());
  }

  registerUser(user: User): Observable<GenericResponse> {
    return this.http.post(`${API_USER_URL}/registerUser`, user, this.options)
      .map(res => res.json());
  }

  removeReferrals(ids: string[]): Observable<RemoveReferralsResponse> {
    return this.http.post(`${API_USER_URL}/removeReferrals`, ids, this.options)
      .map(res => res.json());
  }

  resetPassword(reset: { email: string, code: string, password: string }): Observable<GenericResponse> {
    return this.http.post(`${API_USER_URL}/resetPassword`, reset, this.options)
      .map(res => res.json());
  }

  setSponsor(sponsorUsername: string): Observable<SetSponsorResponse> {
    return this.http.post(`${API_USER_URL}/setSponsor`, { sponsorUsername: sponsorUsername }, this.options)
      .map(res => res.json());
  }

  updateProfile(user: User): Observable<GetProfileResponse> {
    return this.http.post(`${API_USER_URL}/updateProfile`, user, this.options)
      .map(res => res.json());
  }
}
