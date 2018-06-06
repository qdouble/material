import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StackTrace from 'stacktrace-js';
import * as fromStore from './reducers';
import { LoggingService } from './services/logging';
import * as loggingAction from './actions/logging';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private store: Store<fromStore.AppState>) {}
  handleError(error) {
    const loggingService = this.injector.get(LoggingService);
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackFrames => {
      const stackString = stackFrames
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        })
        .join('\n');
      this.store.dispatch(
        new loggingAction.LogHandledError({
          message,
          category: 'Handled Error',
          url,
          stack: stackString
        })
      );
      // log on the server
      return loggingService.logHandledError({ message, url, stack: stackString });
    });
    throw error;
  }
}
