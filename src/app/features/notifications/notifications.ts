import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { NotificationActions } from '../../actions/notification';
import { getNotificationCollection } from '../../reducers/notification';
import { Notification } from '../../models/notification';

import { combineSort } from '../../helper/combine-sort';

@Component({
  selector: 'os-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})

export class NotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  sortedNotifications$: Observable<Notification[]>;
  constructor(
    private notificationActions: NotificationActions,
    private store: Store<AppState>,
  ) {
    this.notifications$ = store.let(getNotificationCollection());
    this.sortedNotifications$ = Observable.combineLatest(
      Observable.of(['createdAt', true]), this.notifications$, combineSort
    );
  }
  ngOnInit() {
    this.store.dispatch(this.notificationActions.getNotifications(''));
  }
  deleteAllNotifications() {
    this.store.dispatch(this.notificationActions.deleteAllNotifications());
  }
  deleteNotifications(ids: string[]) {
    this.store.dispatch(this.notificationActions.deleteNotifications(ids));
  }
  markNotificationsAsRead(mark: { ids: string[], read: boolean }) {
    this.store.dispatch(this.notificationActions.markNotificationsAsRead(mark));
  }
  markAllAsRead() {
    this.store.dispatch(this.notificationActions.markAllAsRead());
  }
}
