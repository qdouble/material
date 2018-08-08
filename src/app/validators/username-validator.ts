import { FormControl } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, switchMap, catchError } from 'rxjs/operators';
import { API_USER_URL } from '../services/constants';

@Injectable()
export class UsernameValidator {
  input: ReplaySubject<any>;
  request: any;

  constructor(private http: HttpClient) {
    this.input = new ReplaySubject(1);
    this.request = this.input.pipe(
      debounceTime(50),
      distinctUntilChanged(),
      take(1),
      switchMap(input => this.http.get(`${API_USER_URL}/checkUsername?username=${input}`)),
      catchError(() => of(null))
    );
  }

  usernameTaken = (control: FormControl): AsyncValidatorFn => {
    this.input.next(control.value);
    return this.request;
    // tslint:disable-next-line:semicolon
  };
}
