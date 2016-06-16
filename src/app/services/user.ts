import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import  { API_ADMIN_URL } from './constants';

@Injectable()
export class UserService {
    constructor(private http: Http) {}
    checkEmail(email: string): Observable<User> {
        return this.http.get(`${API_ADMIN_URL}/checkUserEmail?email=${email}`)
        .map(res => res.json())
    }
}