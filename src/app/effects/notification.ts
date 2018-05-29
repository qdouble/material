/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';

import { NotificationService } from '../services/notification';
import {
  DeleteAllNotificationsFail,
  DeleteAllNotificationsSuccess,
  DeleteNotifications,
  DeleteNotificationsFail,
  DeleteNotificationsSuccess,
  NotificationActionTypes,
  MarkAllAsReadFail,
  MarkAllAsReadSuccess,
  MarkNotificationsAsRead,
  MarkNotificationsAsReadFail,
  MarkNotificationsAsReadSuccess,
  GetNotificationsSuccess,
  GetNotificationsFail,
  GetNotifications
} from '../actions/notification';

@Injectable()
export class NotificationEffects {
  constructor(public actions$: Actions, private notificationService: NotificationService) {}

  @Effect()
  deleteAllNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.DeleteAllNotifications),
    switchMap(() =>
      this.notificationService
        .deleteAllNotifications()
        .pipe(
          map(res => new DeleteAllNotificationsSuccess(res)),
          catchError(err => Observable.of(new DeleteAllNotificationsFail(err)))
        )
    )
  );

  @Effect()
  deleteNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.DeleteNotifications),
    map((action: DeleteNotifications) => action.payload),
    switchMap(ids =>
      this.notificationService
        .deleteNotifications(ids)
        .pipe(
          map(res => new DeleteNotificationsSuccess(res)),
          catchError(err => Observable.of(new DeleteNotificationsFail(err)))
        )
    )
  );

  @Effect()
  getNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.GetNotifications),
    map((action: GetNotifications) => action.payload),
    switchMap(query =>
      this.notificationService
        .getNotifications(query)
        .pipe(
          map(res => new GetNotificationsSuccess(res)),
          catchError(err => Observable.of(new GetNotificationsFail(err)))
        )
    )
  );

  @Effect()
  markAllAsRead$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.MarkAllAsRead),
    switchMap(query =>
      this.notificationService
        .markAllAsRead()
        .pipe(
          map(res => new MarkAllAsReadSuccess(res)),
          catchError(err => Observable.of(new MarkAllAsReadFail(err)))
        )
    )
  );

  @Effect()
  markNotificationsAsRead$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.MarkNotificationsAsRead),
    map((action: MarkNotificationsAsRead) => action.payload),
    switchMap(mark =>
      this.notificationService
        .markNotificationsAsRead(mark)
        .pipe(
          map(res => new MarkNotificationsAsReadSuccess(res)),
          catchError(err => Observable.of(new MarkNotificationsAsReadFail(err)))
        )
    )
  );
}
