import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  DeleteAllNotificationsFail,
  DeleteAllNotificationsSuccess,
  DeleteNotifications,
  DeleteNotificationsFail,
  DeleteNotificationsSuccess,
  GetNotifications,
  GetNotificationsFail,
  GetNotificationsSuccess,
  MarkAllAsReadFail,
  MarkAllAsReadSuccess,
  MarkNotificationsAsRead,
  MarkNotificationsAsReadFail,
  MarkNotificationsAsReadSuccess,
  NotificationActionTypes
} from '../actions/notification';
import { NotificationService } from '../services/notification';

@Injectable()
export class NotificationEffects {
  constructor(public actions$: Actions, private notificationService: NotificationService) {}

  @Effect()
  deleteAllNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.DeleteAllNotifications),
    switchMap(() =>
      this.notificationService.deleteAllNotifications().pipe(
        map(res => new DeleteAllNotificationsSuccess(res)),
        catchError(err => of(new DeleteAllNotificationsFail(err)))
      )
    )
  );

  @Effect()
  deleteNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.DeleteNotifications),
    map((action: DeleteNotifications) => action.payload),
    switchMap(ids =>
      this.notificationService.deleteNotifications(ids).pipe(
        map(res => new DeleteNotificationsSuccess(res)),
        catchError(err => of(new DeleteNotificationsFail(err)))
      )
    )
  );

  @Effect()
  getNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.GetNotifications),
    map((action: GetNotifications) => action.payload),
    switchMap(query =>
      this.notificationService.getNotifications(query).pipe(
        map(res => new GetNotificationsSuccess(res)),
        catchError(err => of(new GetNotificationsFail(err)))
      )
    )
  );

  @Effect()
  markAllAsRead$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.MarkAllAsRead),
    switchMap(query =>
      this.notificationService.markAllAsRead().pipe(
        map(res => new MarkAllAsReadSuccess(res)),
        catchError(err => of(new MarkAllAsReadFail(err)))
      )
    )
  );

  @Effect()
  markNotificationsAsRead$: Observable<Action> = this.actions$.pipe(
    ofType(NotificationActionTypes.MarkNotificationsAsRead),
    map((action: MarkNotificationsAsRead) => action.payload),
    switchMap(mark =>
      this.notificationService.markNotificationsAsRead(mark).pipe(
        map(res => new MarkNotificationsAsReadSuccess(res)),
        catchError(err => of(new MarkNotificationsAsReadFail(err)))
      )
    )
  );
}
