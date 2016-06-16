import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../models/user';

@Injectable()

export class UserActions {
    static CHECK_EMAIL = '[User] Check Email';
    checkEmail(email: string): Action {
        return {
            type: UserActions.CHECK_EMAIL,
            payload: email
        }
    }

    static CHECK_EMAIL_FAIL = '[User] Check Email Fail';
    checkEmailFail(email: string): Action {
        return {
            type: UserActions.CHECK_EMAIL_FAIL,
            payload: email
        }
    }

    static CHECK_EMAIL_SUCCESS = '[User] Check Email Success';
    checkEmailSuccess(email: string): Action {
        return {
            type: UserActions.CHECK_EMAIL_SUCCESS,
            payload: email
        }
    }
    
    static LOGIN = '[User] Login';
    login(user: User): Action {
        return {
            type: UserActions.LOGIN,
            payload: user
        }
    }

    static LOG_MESSAGE = '[User] Log Message';
    logMessage(message: string): Action {
        return {
            type: UserActions.LOG_MESSAGE,
            payload: message
        }
    }
    
    static LOGOUT = '[User] Logout';
    logout(user: User) : Action {
        return {
            type: UserActions.LOGOUT,
            payload: user
        }
    }
}