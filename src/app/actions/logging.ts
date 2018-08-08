import { Action } from '@ngrx/store';

import { HandledError } from '../models/logging';
import { GenericResponse } from '../models/generic-response';

export enum LoggingActionTypes {
  LogHandledError = '[Logging] Log Handled Error',
  LogHandledErrorFail = '[Logging] Log Handled Error Fail',
  LogHandledErrorSuccess = '[Logging] Log Handled Error Success'
}

export class LogHandledError implements Action {
  readonly type = LoggingActionTypes.LogHandledError;

  constructor(public payload: HandledError) {}
}

export class LogHandledErrorFail implements Action {
  readonly type = LoggingActionTypes.LogHandledErrorFail;

  constructor(public payload: Error) {}
}

export class LogHandledErrorSuccess implements Action {
  readonly type = LoggingActionTypes.LogHandledErrorSuccess;

  constructor(public payload: GenericResponse) {}
}

export type LoggingActions = LogHandledError | LogHandledErrorFail | LogHandledErrorSuccess;
