/* tslint:disable: member-ordering max-line-length */
import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Notification } from '../models/notification';

@Injectable()

export class NotificationActions {
  static ADD_NOTIFICATION = '[Notification] Add Notification';
  addNotification<T extends Notification>(notification: T): Action {
    return {
      type: NotificationActions.ADD_NOTIFICATION,
      payload: notification
    };
  }

  static DELETE_ALL_NOTIFICATIONS = '[Notification] Delete All Notifications';
  deleteAllNotifications(): Action {
    return {
      type: NotificationActions.DELETE_ALL_NOTIFICATIONS
    };
  }

  static DELETE_ALL_NOTIFICATIONS_FAIL = '[Notification] Delete All Notifications Fail';
  deleteAllNotificationsFail(err: Error): Action {
    return {
      type: NotificationActions.DELETE_ALL_NOTIFICATIONS_FAIL,
      payload: err
    };
  }

  static DELETE_ALL_NOTIFICATIONS_SUCCESS = '[Notification] Delete All Notifications Success';
  deleteAllNotificationsSuccess(res: { success: boolean }): Action {
    return {
      type: NotificationActions.DELETE_ALL_NOTIFICATIONS_SUCCESS,
      payload: res
    };
  }

  static DELETE_NOTIFICATIONS = '[Notification] Delete Notifications';
  deleteNotifications(ids: string[]): Action {
    return {
      type: NotificationActions.DELETE_NOTIFICATIONS,
      payload: ids
    };
  }

  static DELETE_NOTIFICATIONS_FAIL = '[Notification] Delete Notifications Fail';
  deleteNotificationsFail(err: Error): Action {
    return {
      type: NotificationActions.DELETE_NOTIFICATIONS_FAIL,
      payload: err
    };
  }

  static DELETE_NOTIFICATIONS_SUCCESS = '[Notification] Delete Notifications Success';
  deleteNotificationsSuccess(res: { ids: string[] }): Action {
    return {
      type: NotificationActions.DELETE_NOTIFICATIONS_SUCCESS,
      payload: res
    };
  }

  static GET_NOTIFICATIONS = '[Notification] Get Notifications';
  getNotifications(query: string): Action {
    return {
      type: NotificationActions.GET_NOTIFICATIONS,
      payload: query
    };
  }

  static GET_NOTIFICATIONS_FAIL = '[Notification] Get Notifications Fail';
  getNotificationsFail(err: Error): Action {
    return {
      type: NotificationActions.GET_NOTIFICATIONS_FAIL,
      payload: err
    };
  }

  static GET_NOTIFICATIONS_SUCCESS = '[Notification] Get Notifications Success';
  getNotificationsSuccess(res: { notifications: Notification[] }): Action {
    return {
      type: NotificationActions.GET_NOTIFICATIONS_SUCCESS,
      payload: res
    };
  }

  static INC_PENDING_UNREAD_TOTAL = '[Notification] Inc Pending Unread Total';
  incPendingUnreadTotal(total: number): Action {
    return {
      type: NotificationActions.INC_PENDING_UNREAD_TOTAL,
      payload: total
    };
  }

  static MARK_ALL_AS_READ = '[Notification] Mark All As Read';
  markAllAsRead(): Action {
    return {
      type: NotificationActions.MARK_ALL_AS_READ
    };
  }

  static MARK_ALL_AS_READ_FAIL = '[Notification] Mark All As Read Fail';
  markAllAsReadFail(err: Error): Action {
    return {
      type: NotificationActions.MARK_ALL_AS_READ_FAIL,
      payload: err
    };
  }

  static MARK_ALL_AS_READ_SUCCESS = '[Notification] Mark All As Read Success';
  markAllAsReadSuccess(res: { success: boolean }): Action {
    return {
      type: NotificationActions.MARK_ALL_AS_READ_SUCCESS,
      payload: res
    };
  }

  static MARK_NOTIFICATIONS_AS_READ = '[Notification] Mark Notifications As Read';
  markNotificationsAsRead(mark: { ids: string[], read: boolean }): Action {
    return {
      type: NotificationActions.MARK_NOTIFICATIONS_AS_READ,
      payload: mark
    };
  }

  static MARK_NOTIFICATIONS_AS_READ_FAIL = '[Notification] Mark Notifications As Read Fail';
  markNotificationsAsReadFail(err: Error): Action {
    return {
      type: NotificationActions.MARK_NOTIFICATIONS_AS_READ_FAIL,
      payload: err
    };
  }

  static MARK_NOTIFICATIONS_AS_READ_SUCCESS = '[Notification] Mark Notifications As Read Success';
  markNotificationsAsReadSuccess(res: { ids: string[], read: boolean }): Action {
    return {
      type: NotificationActions.MARK_NOTIFICATIONS_AS_READ_SUCCESS,
      payload: res
    };
  }

  static SET_NOTIFICATION_UNREAD_TOTAL = '[Notification] Set Notification Total';
  setNotificationTotal(total: number): Action {
    return {
      type: NotificationActions.SET_NOTIFICATION_UNREAD_TOTAL,
      payload: total
    };
  }

}
