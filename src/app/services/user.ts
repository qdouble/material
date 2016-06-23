import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import  { API_ADMIN_URL } from './constants';

@Injectable()
export class UserService {
    headers = new Headers();
    postHeaders: any;
    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.postHeaders = {headers: this.headers};
    }
    checkEmail(email: string): Observable<User> {
        return this.http.get(`${API_ADMIN_URL}/checkUserEmail?email=${email}`)
        .map(res => res.json())
    }

    getProfile(id: string): Observable<User> {
        return this.http.post(`${API_ADMIN_URL}/getUserProfile`, JSON.stringify({id: id}), this.postHeaders)
        .map(res => res.json())
    }

    loginUser(user: User): Observable<User> {
        return this.http.post(`${API_ADMIN_URL}/loginUser`, user)
        .map(res => res.json())
    }

    registerUser(user: User): Observable<User> {
        return this.http.post(`${API_ADMIN_URL}/registerUser`, user)
        .map(res => res.json())
    }

    updateProfile(user: User): Observable<User> {
        return this.http.post(`${API_ADMIN_URL}/updateUserProfile`, user)
        .map(res => res.json())
    }
}