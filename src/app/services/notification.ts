/* tslint:disable max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { Notification } from '../models/notification';
import { RequestBase } from './request-base';

@Injectable()
export class NotificationService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  deleteAllNotifications(): Observable<{ success: boolean }> {
    return this.http.delete(`${API_USER_URL}/deleteAllNotifications`, this.options)
      .map(res => res.json());
  }

  deleteNotifications(ids: string[]): Observable<{ ids: string[] }> {
    return this.http.post(`${API_USER_URL}/deleteNotifications`, ids, this.options)
      .map(res => res.json());
  }

  getNotification(id: string): Observable<Notification[]> {
    return this.http.get(`${API_USER_URL}/getNotification?id=${id}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getNotifications(query?: string): Observable<Notification[]> {
    return this.http.get(`${API_USER_URL}/getNotifications?${query}`, this.optionsNoPre)
      .map(res => res.json());
  }

  getViewNotifications(): Observable<Notification[]> {
    return this.http.get(`${API_USER_URL}/getViewNotifications`, this.optionsNoPre)
      .map(res => res.json());
  }

  markAllAsRead(): Observable<Notification[]> {
    return this.http.get(`${API_USER_URL}/markAllNotificationsAsRead`, this.optionsNoPre)
      .map(res => res.json());
  }
  markNotificationsAsRead(mark: { ids: string[], read: boolean }): Observable<{ ids: string[], read: boolean }> {
    return this.http.post(`${API_USER_URL}/markNotificationsAsRead`, mark, this.options)
      .map(res => res.json());
  }
}
