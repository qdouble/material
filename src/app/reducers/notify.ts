/* tslint:disable: no-switch-case-fall-through */
/* tslint:disable: variable-names */
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Action } from '@ngrx/store';

import { AppState } from './';
import { NotifyActions } from '../actions/notify';
import { Notify } from '../models/notify';


export interface NotifyState {
  ids: number[];
  entities: { [id: number]: Notify };
}

export const initialState: NotifyState = {
  ids: [],
  entities: {}
};

export function notifyReducer (state = initialState, action: Action): NotifyState {
  switch (action.type) {

    case NotifyActions.ADD_NOTIFY: {
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
      const notify: Notify = {
        id: id,
        message: message,
        type: type
      };
      return {
        ids: [...state.ids, id],
        entities: Object.assign({}, state.entities, {
          [id]: notify
        })
      };
    }

    case NotifyActions.DELETE_NOTIFY: {
      const notifyId: number = action.payload;
      const entitiesMod = state.entities;
      delete entitiesMod[notifyId];

      return {
        ids: state.ids.filter(id => id !== notifyId),
        entities: entitiesMod
      };
    }

    default: {
      return state;
    }
  }
}

function _getNofityEntities() {
  return (state$: Observable<NotifyState>) => state$
    .select(s => s.entities);
}

function _getNotify(id: number) {
  return (state$: Observable<NotifyState>) => state$
    .select(s => s.entities[id]);
}

function _getNotifications(notifyIds: number[]) {
  return (state$: Observable<NotifyState>) => state$
    .let(_getNofityEntities())
    .map(entities => notifyIds.map(id => entities[id]));
}

function _getNotifyIds() {
  return (state$: Observable<NotifyState>) => state$
    .select(s => s.ids);
}

function _getNotifyCollection() {
  return (state$: Observable<NotifyState>) => state$
    .let(_getNotifyIds())
    .switchMap((userId) => state$.let(_getNotifications(userId))
    );
}

function _getNotifyState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.notify);
}

export function getNotify(notifyId: number) {
  return compose(_getNotify(notifyId), _getNotifyState());
}

export function getNotifications(notifyIds: number[]) {
  return compose(_getNotifications(notifyIds), _getNotifyState());
}

export function getNotifyCollection() {
  return compose(_getNotifyCollection(), _getNotifyState());
}
