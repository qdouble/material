import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/generic-response';
import { HandledError } from '../models/logging';
import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';

@Injectable()
export class LoggingService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  logHandledError(handledError: HandledError) {
    console.log('logHandledError was called!'.toUpperCase());
    return this.http.post<GenericResponse>(
      `${API_USER_URL}/logFrontendError`,
      handledError,
      this.options
    );
  }
}
