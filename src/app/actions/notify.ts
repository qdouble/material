/* tslint:disable: member-ordering max-line-length */
import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Notify } from '../models/notify';

@Injectable()

export class NotifyActions {
  static ADD_NOTIFY = '[Notify] Add Notify';
  addNotify<T extends Notify>(notify: T ): Action {
    return {
      type: NotifyActions.ADD_NOTIFY,
      payload: notify
    };
  }
  static DELETE_NOTIFY = '[Notify] Delete Notify';
  deleteNotify(notify: Notify): Action {
    return {
      type: NotifyActions.DELETE_NOTIFY,
      payload: notify
    };
  }
}
