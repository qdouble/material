/* tslint:disable max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { DeleteNotificationsResponse, GetNotificationsResponse, MarkAllAsReadResponse, MarkNotificationAsReadResponse } from '../models/notification';
import { RequestBase } from './request-base';
import { GenericResponse } from '../models/generic-response';

@Injectable()
export class NotificationService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  deleteAllNotifications() {
    return this.http.delete<GenericResponse>
      (`${API_USER_URL}/deleteAllNotifications`, this.options);
  }

  deleteNotifications(ids: string[]) {
    return this.http.post<DeleteNotificationsResponse>
      (`${API_USER_URL}/deleteNotifications`, ids, this.options);
  }

  getNotifications(query?: string) {
    return this.http.get<GetNotificationsResponse>
      (`${API_USER_URL}/getNotifications?${query}`, this.optionsNoPre);
  }

  markAllAsRead() {
    return this.http.get<MarkAllAsReadResponse>
      (`${API_USER_URL}/markAllNotificationsAsRead`, this.optionsNoPre);
  }
  markNotificationsAsRead(mark: { ids: string[], read: boolean }) {
    return this.http.post<MarkNotificationAsReadResponse>
      (`${API_USER_URL}/markNotificationsAsRead`, mark, this.options);
  }
}
