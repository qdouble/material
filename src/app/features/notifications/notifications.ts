import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../reducers';
import * as notificationActions from '../../actions/notification';
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
  constructor(private store: Store<fromStore.AppState>) {
    this.notifications$ = store.pipe(select(fromStore.getNotificationCollection));
    this.sortedNotifications$ = Observable.combineLatest(
      Observable.of(['createdAt', true]),
      this.notifications$,
      combineSort
    );
  }
  ngOnInit() {
    this.store.dispatch(new notificationActions.GetNotifications(''));
  }
  deleteAllNotifications() {
    this.store.dispatch(new notificationActions.DeleteAllNotifications());
  }
  deleteNotifications(ids: string[]) {
    this.store.dispatch(new notificationActions.DeleteNotifications(ids));
  }
  markNotificationsAsRead(mark: { ids: string[]; read: boolean }) {
    this.store.dispatch(new notificationActions.MarkNotificationsAsRead(mark));
  }
  markAllAsRead() {
    this.store.dispatch(new notificationActions.MarkAllAsRead());
  }
}
