/* tslint:disable max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { DeleteNotificationsResponse, GetNotificationsResponse, MarkAllAsReadResponse, MarkNotificationAsReadResponse } from '../models/notification';
import { RequestBase } from './request-base';
import { GenericResponse } from '../models/generic-response';

@Injectable()
export class NotificationService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  deleteAllNotifications(): Observable<GenericResponse> {
    return this.http.delete(`${API_USER_URL}/deleteAllNotifications`, this.options)
      .map(res => res.json());
  }

  deleteNotifications(ids: string[]): Observable<DeleteNotificationsResponse> {
    return this.http.post(`${API_USER_URL}/deleteNotifications`, ids, this.options)
      .map(res => res.json());
  }

  getNotifications(query?: string): Observable<GetNotificationsResponse> {
    return this.http.get(`${API_USER_URL}/getNotifications?${query}`, this.optionsNoPre)
      .map(res => res.json());
  }

  markAllAsRead(): Observable<MarkAllAsReadResponse> {
    return this.http.get(`${API_USER_URL}/markAllNotificationsAsRead`, this.optionsNoPre)
      .map(res => res.json());
  }
  markNotificationsAsRead(mark: { ids: string[], read: boolean }): Observable<MarkNotificationAsReadResponse> {
    return this.http.post(`${API_USER_URL}/markNotificationsAsRead`, mark, this.options)
      .map(res => res.json());
  }
}
