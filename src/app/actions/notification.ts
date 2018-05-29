import { Action } from '@ngrx/store';

import {
  Notification,
  DeleteNotificationsResponse,
  GetNotificationsResponse,
  MarkAllAsReadResponse
} from '../models/notification';
import { GetProfileResponse } from '../models/user';
import { GenericResponse } from '../models/generic-response';

export enum NotificationActionTypes {
  AddNotification = '[Notification] Add Notification',
  DeleteAllNotifications = '[Notification] Delete All Notifications',
  DeleteAllNotificationsFail = '[Notification] Delete All Notifications Fail',
  DeleteAllNotificationsSuccess = '[Notification] Delete All Notifications Success',
  DeleteNotifications = '[Notification] Delete Notifications',
  DeleteNotificationsFail = '[Notification] Delete Notifications Fail',
  DeleteNotificationsSuccess = '[Notification] Delete Notifications Success',
  GetNotifications = '[Notification] Get Notifications',
  GetNotificationsFail = '[Notification] Get Notifications Fail',
  GetNotificationsSuccess = '[Notification] Get Notifications Success',
  IncPendingUnreadTotal = '[Notification] Inc Pending Unread Total',
  MarkAllAsRead = '[Notification] Mark All As Read',
  MarkAllAsReadFail = '[Notification] Mark All As Read Fail',
  MarkAllAsReadSuccess = '[Notification] Mark All As Read Success',
  MarkNotificationsAsRead = '[Notification] Mark Notifications As Read',
  MarkNotificationsAsReadFail = '[Notification] Mark Notifications As Read Fail',
  MarkNotificationsAsReadSuccess = '[Notification] Mark Notifications As Read Success',
  Select = '[Notification] Select',
  SetNotificationUnreadTotal = '[Notification] Set Notification Unread Total'
}

export class AddNotification implements Action {
  readonly type = NotificationActionTypes.AddNotification;

  constructor(public payload: Notification) {}
}

export class DeleteAllNotifications implements Action {
  readonly type = NotificationActionTypes.DeleteAllNotifications;
}

export class DeleteAllNotificationsFail implements Action {
  readonly type = NotificationActionTypes.DeleteAllNotificationsFail;

  constructor(public payload: Error) {}
}

export class DeleteAllNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.DeleteAllNotificationsSuccess;

  constructor(public payload: GenericResponse) {}
}

export class DeleteNotifications implements Action {
  readonly type = NotificationActionTypes.DeleteNotifications;

  constructor(public payload: string[]) {}
}

export class DeleteNotificationsFail implements Action {
  readonly type = NotificationActionTypes.DeleteNotificationsFail;

  constructor(public payload: Error) {}
}

export class DeleteNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.DeleteNotificationsSuccess;

  constructor(public payload: DeleteNotificationsResponse) {}
}

export class GetNotifications implements Action {
  readonly type = NotificationActionTypes.GetNotifications;

  constructor(public payload: string) {}
}

export class GetNotificationsFail implements Action {
  readonly type = NotificationActionTypes.GetNotificationsFail;

  constructor(public payload: Error) {}
}

export class GetNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.GetNotificationsSuccess;

  constructor(public payload: GetNotificationsResponse) {}
}

export class IncPendingUnreadTotal implements Action {
  readonly type = NotificationActionTypes.IncPendingUnreadTotal;

  constructor(public payload: number) {}
}

export class MarkAllAsRead implements Action {
  readonly type = NotificationActionTypes.MarkAllAsRead;
}

export class MarkAllAsReadFail implements Action {
  readonly type = NotificationActionTypes.MarkAllAsReadFail;

  constructor(public payload: Error) {}
}

export class MarkAllAsReadSuccess implements Action {
  readonly type = NotificationActionTypes.MarkAllAsReadSuccess;

  constructor(public payload: MarkAllAsReadResponse) {}
}

export class MarkNotificationsAsRead implements Action {
  readonly type = NotificationActionTypes.MarkNotificationsAsRead;

  constructor(public payload: { ids: string[]; read: boolean }) {}
}

export class MarkNotificationsAsReadFail implements Action {
  readonly type = NotificationActionTypes.MarkNotificationsAsReadFail;

  constructor(public payload: Error) {}
}

export class MarkNotificationsAsReadSuccess implements Action {
  readonly type = NotificationActionTypes.MarkNotificationsAsReadSuccess;

  constructor(public payload: { ids: number[]; read: boolean }) {}
}

export class Select implements Action {
  readonly type = NotificationActionTypes.Select;

  constructor(public payload: number) {}
}

export class SetNotificationUnreadTotal implements Action {
  readonly type = NotificationActionTypes.SetNotificationUnreadTotal;

  constructor(public payload: GetProfileResponse) {}
}

export type NotificationActions =
  | AddNotification
  | DeleteAllNotifications
  | DeleteAllNotificationsFail
  | DeleteAllNotificationsSuccess
  | DeleteNotifications
  | DeleteNotificationsFail
  | DeleteNotificationsSuccess
  | GetNotifications
  | GetNotificationsFail
  | GetNotificationsSuccess
  | IncPendingUnreadTotal
  | MarkAllAsRead
  | MarkAllAsReadFail
  | MarkAllAsReadSuccess
  | MarkNotificationsAsRead
  | MarkNotificationsAsReadFail
  | MarkNotificationsAsReadSuccess
  | Select
  | SetNotificationUnreadTotal;
