/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_ADMIN_URL, API_USER_URL } from './constants';
import { User, GetProfileResponse, GetReferralResponse, RecordClickResponse, HideReferralsResponse } from '../models/user';
import { RequestBase } from './request-base';
import { ChangeSelectedPrizeResponse, CheckIfUserUpdatedAtResponse, CheckIPMatchResponse, CheckReferrerUsernameResponse, DismissProfileChangesResponse, RemoveReferralsResponse, SetSponsorResponse } from '../models/prize';
import { GenericResponse } from '../models/generic-response';

@Injectable()
export class UserService extends RequestBase {

  constructor(public http: HttpClient) {
    super(http);
  }

  changeSelectedPrize(id: string) {
    return this.http.get<ChangeSelectedPrizeResponse>
      (`${API_USER_URL}/changeSelectedPrize?id=${id}`, this.optionsNoPre);
  }

  checkEmail(email: string) {
    return this.http.get<GenericResponse>
      (`${API_USER_URL}/checkUserEmail?email=${email}`, this.optionsNoPre);
  }

  checkIfUserUpdated() {
    return this.http.get<CheckIfUserUpdatedAtResponse>
      (`${API_USER_URL}/checkIfUserUpdated`, this.optionsNoPre);
  }

  checkIPMatch(sponsor: string) {
    return this.http.get<CheckIPMatchResponse>
      (`${API_USER_URL}/checkIPMatch?referredBy=${sponsor}`, this.optionsNoPre);
  }

  checkLoggedIn() {
    return this.http.get
      (`${API_USER_URL}/loggedIn`, { ...this.optionsNoPre, responseType: 'text' });
  }

  checkReferrerUsername(username: string) {
    return this.http.get<CheckReferrerUsernameResponse>
      (`${API_USER_URL}/checkReferrerUsername?username=${username}`, this.optionsNoPre);
  }

  dismissProfileChanges() {
    return this.http.get<DismissProfileChangesResponse>
      (`${API_USER_URL}/dismissProfileChanges`, this.optionsNoPre);
  }

  forgotPassword(email: string) {
    return this.http.post<GenericResponse>
      (`${API_USER_URL}/forgotPassword`, { email: email }, this.options);
  }

  hideReferrals(hideRefs: { ids: string[], hide: boolean }) {
    return this.http.post<HideReferralsResponse>
      (`${API_USER_URL}/hideReferrals`, hideRefs, this.options);
  }

  getProfile() {
    return this.http.get<GetProfileResponse>
      (`${API_USER_URL}/getProfile`, this.optionsNoPre);
  }

  getReferral(id: string) {
    return this.http.get<GetReferralResponse>
      (`${API_USER_URL}/getReferral?id=${id}`, this.optionsNoPre);
  }

  loginAdmin(user: User) {
    return this.http.post<GenericResponse>
      (`${API_ADMIN_URL}/login`, user, this.options);
  }

  loginUser(user: User) {
    return this.http.post<GenericResponse>
      (`${API_USER_URL}/login`, user, this.options);
  }

  logout() {
    return this.http.get
      (`${API_USER_URL}/logout`, { ...this.optionsNoPre, responseType: 'text' });
  }

  recordClick(offerId: string) {
    return this.http.post<RecordClickResponse>
      (`${API_USER_URL}/recordClick`, { 'id': offerId }, this.options)
      .retry();
  }

  registerUser(user: User) {
    return this.http.post<GenericResponse>
      (`${API_USER_URL}/registerUser`, user, this.options);
  }

  removeReferrals(ids: string[]) {
    return this.http.post<RemoveReferralsResponse>
      (`${API_USER_URL}/removeReferrals`, ids, this.options);
  }

  resetPassword(reset: { email: string, code: string, password: string }) {
    return this.http.post<GenericResponse>
      (`${API_USER_URL}/resetPassword`, reset, this.options);
  }

  setSponsor(sponsorUsername: string) {
    return this.http.post<SetSponsorResponse>
      (`${API_USER_URL}/setSponsor`, { sponsorUsername: sponsorUsername }, this.options);
  }

  updateProfile(user: User) {
    return this.http.post<GetProfileResponse>
      (`${API_USER_URL}/updateProfile`, user, this.options);
  }
}
