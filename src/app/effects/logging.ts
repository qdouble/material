import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoggingActionTypes,
  LogHandledError,
  LogHandledErrorFail,
  LogHandledErrorSuccess
} from '../actions/logging';
import { LoggingService } from '../services/logging';

@Injectable()
export class LoggingEffects {
  constructor(public actions$: Actions, private loggingService: LoggingService) {}

  @Effect()
  logHandledError$: Observable<Action> = this.actions$.pipe(
    ofType(LoggingActionTypes.LogHandledError),
    map((action: LogHandledError) => action.payload),
    switchMap(handledError =>
      this.loggingService.logHandledError(handledError).pipe(
        map(res => new LogHandledErrorSuccess(res)),
        catchError(err => of(new LogHandledErrorFail(err)))
      )
    )
  );
}
