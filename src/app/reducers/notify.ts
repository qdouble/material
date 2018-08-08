/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { NotifyActionTypes, NotifyActions } from '../actions/notify';
import { Notify } from '../models/notify';

export const adapter = createEntityAdapter<Notify>({
  selectId: (notify: Notify) => notify.id
});

export interface State extends EntityState<Notify> {
  ids: string[];
  selectedNotify: string | null;
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  selectedNotify: null
});

export function notifyReducer(state = initialState, action: NotifyActions): State {
  switch (action.type) {
    case NotifyActionTypes.AddNotify: {
      let message: string | undefined;
      let type: string | undefined;
      const response = action.payload;
      const id = state.ids.length + 1;
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
        id: String(id),
        message: message,
        type: type
      };
      return {
        ...adapter.addOne(notify, state)
      };
    }

    case NotifyActionTypes.DeleteNotify: {
      const notifyId = action.payload;
      const entitiesMod = state.entities;
      delete entitiesMod[notifyId];

      return {
        ...state,
        ids: state.ids.filter(id => id !== notifyId),
        entities: entitiesMod
      };
    }

    case NotifyActionTypes.Select: {
      return { ...state, selectedNotify: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedNotify = (state: State) => state.selectedNotify;
