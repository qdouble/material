import { FormControl } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { API_USER_URL } from '../services/constants';

@Injectable()
export class UsernameValidator {
  input: ReplaySubject<any>;
  request: any;

  constructor(private http: HttpClient) {
    this.input = new ReplaySubject(1);
    this.request = this.input
      .debounceTime(50)
      .distinctUntilChanged()
      .take(1)
      .switchMap(input => this.http.get(`${API_USER_URL}/checkUsername?username=${input}`))
      .catch(() => Observable.of(null));
  }

  usernameTaken = (control: FormControl): AsyncValidatorFn => {
    this.input.next(control.value);
    return this.request;
    // tslint:disable-next-line:semicolon
  };
}
