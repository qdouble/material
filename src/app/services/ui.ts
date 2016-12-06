/* tslint:disable: max-line-length */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import { API_USER_URL } from './constants';
import { RequestBase } from './request-base';

@Injectable()
export class UIService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  getVersion(): Observable<Response> {
    return this.http.get(`/version.json`, this.optionsNoPre)
      .map(res => res.json());
  }

}
