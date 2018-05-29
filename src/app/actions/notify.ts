import { Action } from '@ngrx/store';

import { Notify } from '../models/notify';

export enum NotifyActionTypes {
  AddNotify = '[Notify] Add Notify',
  DeleteNotify = '[Notify] Delete Notify',
  Select = '[Notify] Select'
}

export class AddNotify<T extends Notify> implements Action {
  readonly type = NotifyActionTypes.AddNotify;

  constructor(public payload: T) {}
}

export class DeleteNotify implements Action {
  readonly type = NotifyActionTypes.DeleteNotify;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = NotifyActionTypes.Select;

  constructor(public payload: string) {}
}

export type NotifyActions = AddNotify<any> | DeleteNotify | Select;
