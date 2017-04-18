/* tslint:disable: no-switch-case-fall-through */
/* tslint:disable: variable-names */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { NotificationActions } from '../actions/notification';
import { Notification } from '../models/notification';

export interface NotificationState {
  ids: string[];
  entities: { [id: string]: Notification };
  pendingTotal: number;
  unreadTotal: number;
}

export const initialState: NotificationState = {
  ids: [],
  entities: {},
  pendingTotal: null,
  unreadTotal: 0
};

export function notificationReducer(state = initialState, action: Action): NotificationState {
  switch (action.type) {

    case NotificationActions.ADD_NOTIFICATION: {
      let message: (string | undefined);
      let type: (string | undefined);
      const response = action.payload;
      const id: number = state.ids.length + 1;
      if (response.message) message = response.message;
      if (response.message_type) type = response.message_type;

      switch (response.status) {
        case 0:
          message = 'Error connecting to server';
          break;
        case 401:
          message = 'Unauthorized.';
          break;
        case 404:
          message = 'Document or URL not found.';
          break;
        default:
      }
      if (message === undefined) return state;
      const notification: Notification = {
        id: id,
        message: message
      };
      return Object.assign({}, state, {
        ids: [...state.ids, id],
        entities: Object.assign({}, state.entities, {
          [id]: notification
        })
      });
    }

    case NotificationActions.DELETE_ALL_NOTIFICATIONS_SUCCESS: {
      const success: boolean = action.payload.success;
      if (!success) return state;
      return Object.assign({}, state, {
        ids: [],
        entities: {},
        pendingTotal: null,
        unreadTotal: 0
      });
    }

    case NotificationActions.DELETE_NOTIFICATIONS_SUCCESS: {
      const ids: string[] = action.payload.ids;
      let reduceTotal = 0;
      if (!ids) return state;
      const entitiesMod = Object.assign({}, state.entities);
      ids.forEach(id => {
        if (!entitiesMod[id].read) {
          reduceTotal += 1;
        }
        delete entitiesMod[id];
      });

      return Object.assign({}, state, {
        ids: state.ids.filter(id => !ids.includes(id)),
        entities: entitiesMod,
        unreadTotal: state.unreadTotal - reduceTotal
      });
    }

    case NotificationActions.INC_PENDING_UNREAD_TOTAL: {
      const inc: number = action.payload;
      if (!inc) return state;
      let pendingTotal = state.pendingTotal ? inc + state.pendingTotal : inc + state.unreadTotal;

      return Object.assign({}, state, {
        pendingTotal: pendingTotal
      });
    }

    case NotificationActions.GET_NOTIFICATIONS_SUCCESS: {
      const notifications: Notification[] = action.payload.notifications;
      const unreadTotal: number = action.payload.unreadTotal;
      if (!notifications) return state;
      const newNotifications = notifications
        .filter(notification => !state.entities[notification.id]);

      const newNotificationIds = newNotifications.map(notification => notification.id);
      const newNotificationEntities = newNotifications
        .reduce((entities: { [id: string]: Notification }, notification: Notification) => {
          return Object.assign(entities, {
            [notification.id]: notification
          });
        }, {});

      return Object.assign({}, state, {
        ids: [...state.ids, ...newNotificationIds],
        entities: Object.assign({}, state.entities, newNotificationEntities),
        unreadTotal: unreadTotal,
        pendingTotal: null
      });
    }

    case NotificationActions.MARK_ALL_AS_READ_SUCCESS: {
      if (!action.payload) return state;
      const newNotifications = Object.assign({}, state.entities);

      Object.keys(newNotifications).forEach((index => {
        newNotifications[index] = Object.assign({}, newNotifications[index], {
          read: true
        });
      }));
      return Object.assign({}, state, {
        entities: newNotifications,
        unreadTotal: 0
      });
    }

    case NotificationActions.MARK_NOTIFICATIONS_AS_READ_SUCCESS: {
      const ids = action.payload.ids;
      const read = action.payload.read;
      let newUnreadTotal = read ? state.unreadTotal - ids.length : state.unreadTotal + ids.length;
      if (!ids || ids.length < 1 || typeof read !== 'boolean') return state;
      const newNotifications = Object.assign({}, state.entities);

      ids.forEach((id => {
        newNotifications[id] = Object.assign({}, newNotifications[id], {
          read: read
        });
      }));

      return Object.assign({}, state, {
        entities: newNotifications,
        unreadTotal: newUnreadTotal
      });
    }

    case NotificationActions.SET_NOTIFICATION_UNREAD_TOTAL: {
      return Object.assign({}, state, {
        unreadTotal: action.payload.unreadTotal
      });
    }

    default: {
      return state;
    }
  }
}

function _getNofityEntities() {
  return (state$: Observable<NotificationState>) => state$
    .select(s => s.entities);
}

function _getNotification(id: string) {
  return (state$: Observable<NotificationState>) => state$
    .select(s => s.entities[id]);
}

function _getNotifications(notificationIds: string[]) {
  return (state$: Observable<NotificationState>) => state$
    .let(_getNofityEntities())
    .map(entities => notificationIds.map(id => entities[id]));
}

function _getNotificationIds() {
  return (state$: Observable<NotificationState>) => state$
    .select(s => s.ids);
}

function _getNotificationCollection() {
  return (state$: Observable<NotificationState>) => state$
    .let(_getNotificationIds())
    .switchMap((userId) => state$.let(_getNotifications(userId))
    );
}

function _getNotificationState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.notification);
}

function _getNoficationPendingTotal() {
  return (state$: Observable<NotificationState>) => state$
    .select(s => s.pendingTotal);
}

function _getNoficationUnreadTotal() {
  return (state$: Observable<NotificationState>) => state$
    .select(s => s.unreadTotal);
}

export function getNotification(notificationId: string) {
  return compose(_getNotification(notificationId), _getNotificationState());
}

export function getNotifications(notificationIds: string[]) {
  return compose(_getNotifications(notificationIds), _getNotificationState());
}

export function getNotificationCollection() {
  return compose(_getNotificationCollection(), _getNotificationState());
}

export function getNoficationPendingTotal() {
  return compose(_getNoficationPendingTotal(), _getNotificationState());
}

export function getNotificationUnreadTotal() {
  return compose(_getNoficationUnreadTotal(), _getNotificationState());
}
