import { FormControl } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms/src/directives/validators';
import { Control } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { API_USER_URL } from '../services/constants';

@Injectable()
export class UsernameValidator {
  input: ReplaySubject<any>;
  request: any;

  constructor(private http: Http) {
    this.input = new ReplaySubject(1);
    this.request = this.input
      .debounceTime(50)
      .distinctUntilChanged()
      .take(1)
      .switchMap(input => this.http.get(`${API_USER_URL}/checkUsername?username=${input}`))
      .map(r => r.json())
      .catch(() => Observable.of(null));
  }

  usernameTaken = (control: FormControl): AsyncValidatorFn => {
    this.input.next(control.value)
    return this.request;
  }
}