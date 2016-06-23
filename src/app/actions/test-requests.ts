import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { User } from '../models/user';

@Injectable()

export class TestRequestActions {
    static SHOW_ALL_USERS = '[Test Requests] Show All Users'
    showAllUsers(): Action{
        return {
            type: TestRequestActions.SHOW_ALL_USERS
        }
    }
    static SHOW_ALL_USERS_FAIL = '[Test Requests] Show All Users Fail'
    showAllUsersFail(response: Response): Action{
        return {
            type: TestRequestActions.SHOW_ALL_USERS_FAIL,
            payload: response
        }
    }
    static SHOW_ALL_USERS_SUCCESS = '[Test Requests] Show All Users Success'
    showAllUsersSuccess(response: Response): Action{
        return {
            type: TestRequestActions.SHOW_ALL_USERS_SUCCESS,
            payload: response
        }
    }
    
}