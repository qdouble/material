/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { NotificationActions, NotificationActionTypes } from '../actions/notification';
import { Notification } from '../models/notification';

export const adapter = createEntityAdapter<Notification>({
  selectId: (notification: Notification) => notification.id
});

export interface State extends EntityState<Notification> {
  ids: number[];
  pendingTotal: number;
  unreadTotal: number;
  selectedNotification: number | null;
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  pendingTotal: null,
  unreadTotal: 0,
  selectedNotification: null
});

export function notificationReducer(
  state = initialState,
  action: NotificationActions
): State {
  switch (action.type) {

    case NotificationActionTypes.AddNotification: {
      let message: string | undefined;
      const response = action.payload;
      const id = state.ids.length + 1;
      if (response.message) message = response.message;

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

      return {
        ...adapter.addOne(notification, state)
      };
    }

    case NotificationActionTypes.DeleteAllNotificationsSuccess: {
      const success = action.payload.success;
      if (!success) return state;
      return {
        ...state,
        ids: [],
        entities: {},
        pendingTotal: null,
        unreadTotal: 0
      };
    }

    case NotificationActionTypes.DeleteNotificationsSuccess: {
      const ids = action.payload.ids;
      let reduceTotal = 0;
      if (!ids) return state;
      ids.forEach(id => {
        if (!state.entities[id].read) {
          reduceTotal += 1;
        }
      });

      return {
        ...adapter.removeMany(ids, state),
        unreadTotal: state.unreadTotal - reduceTotal
      };
    }

    case NotificationActionTypes.IncPendingUnreadTotal: {
      const inc = action.payload;
      if (!inc) return state;
      let pendingTotal = state.pendingTotal ? inc + state.pendingTotal : inc + state.unreadTotal;

      return { ...state, pendingTotal: pendingTotal };
    }

    case NotificationActionTypes.GetNotificationsSuccess: {
      const notifications = action.payload.notifications;
      const unreadTotal = action.payload.unreadTotal;
      if (!notifications) return state;
      const newNotifications = notifications
        .filter(notification => !state.entities[notification.id]);

      return {
        ...adapter.addMany(newNotifications, state),
        unreadTotal: unreadTotal,
        pendingTotal: null
      };
    }

    case NotificationActionTypes.MarkAllAsReadSuccess: {
      if (!(action.payload && action.payload.success)) return state;
      let ids = state.ids;
      return {
        ...adapter.updateMany(ids.map(u => ({
          id: u,
          changes: { read: true }
        })), state),
        unreadTotal: 0
      };
    }

    case NotificationActionTypes.MarkNotificationsAsReadSuccess: {
      const ids = action.payload.ids;
      const read = action.payload.read;
      let newUnreadTotal = read ? state.unreadTotal - ids.length : state.unreadTotal + ids.length;
      if (!ids || ids.length < 1 || typeof read !== 'boolean') return state;
      return {
        ...adapter.updateMany(ids.map(i => ({ id: i, changes: { read: read } })), state),
        unreadTotal: newUnreadTotal
      };
    }

    case NotificationActionTypes.Select: {
      return { ...state, selectedNotification: action.payload };
    }

    case NotificationActionTypes.SetNotificationUnreadTotal: {
      return { ...state, unreadTotal: action.payload.unreadTotal };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: State) => state.pendingTotal;

export const getUnreadTotal = (state: State) => state.unreadTotal;

export const getSelectedNotification = (state: State) => state.selectedNotification;
