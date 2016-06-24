import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import  { API_ADMIN_URL, API_USER_URL } from './constants';

@Injectable()
export class UserService {
    headers = new Headers();
    postHeaders: any;
    options = new RequestOptions({
        headers: this.headers,
        withCredentials: true
    })
    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.postHeaders = {headers: this.headers};
    }
    checkEmail(email: string): Observable<User> {
        return this.http.get(`${API_USER_URL}/checkUserEmail?email=${email}`, this.options)
        .map(res => res.json())
    }

    getProfile(): Observable<User> {
        return this.http.get(`${API_USER_URL}/getUserProfile`, this.options)
        .map(res => res.json())
    }

    loginUser(user: User): Observable<User> {
        console.log(this.options);
        return this.http.post(`${API_USER_URL}/login`, user, this.options)
        .map(res => res.json())
    }

    logout(): Observable<User> {
        return this.http.get(`${API_USER_URL}/logout`, this.options)
        .map(res => res.json())
    }

    registerUser(user: User): Observable<User> {
        return this.http.post(`${API_USER_URL}/registerUser`, user)
        .map(res => res.json())
    }

    updateProfile(user: User): Observable<User> {
        return this.http.post(`${API_USER_URL}/updateUserProfile`, user)
        .map(res => res.json())
    }
}