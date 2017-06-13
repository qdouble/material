/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { NotificationService } from '../services/notification';
import { NotificationActions } from '../actions/notification';

@Injectable()

export class NotificationEffects {
  constructor(
    public actions$: Actions,
    private notificationActions: NotificationActions,
    private notificationService: NotificationService,
  ) { }

  @Effect() deleteAllNotifications$ = this.actions$
    .ofType(NotificationActions.DELETE_ALL_NOTIFICATIONS)
    .map(action => <null>action.payload)
    .switchMap(() => this.notificationService.deleteAllNotifications()
      .map((res) => this.notificationActions.deleteAllNotificationsSuccess(res))
      .catch((err) => Observable.of(
        this.notificationActions.deleteAllNotificationsFail(err)
      ))
    );

  @Effect() deleteNotifications$ = this.actions$
    .ofType(NotificationActions.DELETE_NOTIFICATIONS)
    .map(action => <string[]>action.payload)
    .switchMap(ids => this.notificationService.deleteNotifications(ids)
      .map((res) => this.notificationActions.deleteNotificationsSuccess(res))
      .catch((err) => Observable.of(
        this.notificationActions.deleteNotificationsFail(err)
      ))
    );

  @Effect() getNotifications$ = this.actions$
    .ofType(NotificationActions.GET_NOTIFICATIONS)
    .map(action => <string>action.payload)
    .switchMap(query => this.notificationService.getNotifications(query)
      .map((res: any) => this.notificationActions.getNotificationsSuccess(res))
      .catch((err) => Observable.of(
        this.notificationActions.getNotificationsFail(err)
      ))
    );

  @Effect() markAllAsRead$ = this.actions$
    .ofType(NotificationActions.MARK_ALL_AS_READ)
    .map(action => <string>action.payload)
    .switchMap(query => this.notificationService.markAllAsRead()
      .map((res: any) => this.notificationActions.markAllAsReadSuccess(res.success))
      .catch((err) => Observable.of(
        this.notificationActions.markAllAsReadFail(err)
      ))
    );

  @Effect() markNotificationsAsRead$ = this.actions$
    .ofType(NotificationActions.MARK_NOTIFICATIONS_AS_READ)
    .map(action => <{ ids: string[], read: boolean }>action.payload)
    .switchMap(mark => this.notificationService.markNotificationsAsRead(mark)
      .map((res) => this.notificationActions.markNotificationsAsReadSuccess(res))
      .catch((err) => Observable.of(
        this.notificationActions.markNotificationsAsReadFail(err)
      ))
    );
}
