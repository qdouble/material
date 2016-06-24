import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
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
    checkEmailSuccess(res: Response): Action {
        return {
            type: UserActions.CHECK_EMAIL_SUCCESS,
            payload: res
        }
    }

    static GET_PROFILE = '[User] Get Profile';
    getProfile(): Action {
        return {
            type: UserActions.GET_PROFILE
        }
    }

    static GET_PROFILE_FAIL = '[User] Get Profile Fail';
    getProfileFail(user: Response): Action {
        return {
            type: UserActions.GET_PROFILE_FAIL,
            payload: user
        }
    }
    static GET_PROFILE_SUCCESS = '[User] Get Profile Success';
    getProfileSuccess(user: Response): Action {
        return {
            type: UserActions.GET_PROFILE_SUCCESS,
            payload: user
        }
    }

    static LOGIN = '[User] Login';
    login(user: User): Action {
        return {
            type: UserActions.LOGIN,
            payload: user
        }
    }

    static LOGIN_FAIL = '[User] Login Fail';
    loginFail(user: User): Action {
        return {
            type: UserActions.LOGIN_FAIL,
            payload: user
        }
    }

    static LOGIN_SUCCESS = '[User] Login Success';
    loginSuccess(user: User): Action {
        return {
            type: UserActions.LOGIN_SUCCESS,
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
    logout(): Action {
        return {
            type: UserActions.LOGOUT
        }
    }

    static LOGOUT_FAIL = '[User] Logout Fail';
    logoutFail(): Action {
        return {
            type: UserActions.LOGOUT_FAIL
        }
    }
    
    static LOGOUT_SUCCESS = '[User] Logout Success';
    logoutSuccess(): Action {
        return {
            type: UserActions.LOGOUT_SUCCESS
        }
    }

    static REGISTER = '[User] Register';
    register(user: User): Action {
        return {
            type: UserActions.REGISTER,
            payload: user
        }
    }

    static REGISTER_FAIL = '[User] Register Fail';
    registerFail(user: User): Action {
        return {
            type: UserActions.REGISTER_FAIL,
            payload: user
        }
    }

    static REGISTER_SUCCESS = '[User] Register Success';
    registerSuccess(user: User): Action {
        return {
            type: UserActions.REGISTER_SUCCESS,
            payload: user
        }
    }

    static UPDATE_PROFILE = '[User] Update Profile';
    updateProfile(user: User): Action {
        return {
            type: UserActions.UPDATE_PROFILE,
            payload: user
        }
    }

    static UPDATE_PROFILE_SUCCESS = '[User] Update Profile Success';
    updateProfileSuccess(res: any): Action {
        return {
            type: UserActions.UPDATE_PROFILE_SUCCESS,
            payload: res
        }
    }

    static UPDATE_PROFILE_FAIL = '[User] Update Profile Fail';
    updateProfileFail(user: User): Action {
        return {
            type: UserActions.UPDATE_PROFILE_FAIL,
            payload: user
        }
    }

}