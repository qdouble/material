/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import {
  map,
  mergeMap,
  switchMap,
  catchError,
} from 'rxjs/operators';

import {
  AddUserIDToSocket,
  AddUserIDToSocketFail,
  AddUserIDToSocketSuccess,
  ContactUs,
  ContactUsFail,
  ContactUsSuccess,
  GetVersionFail,
  GetVersionSuccess,
  UIActionTypes
} from '../actions/ui';
import { UIService } from '../services/ui';
import { AddNotify } from '../actions/notify';

@Injectable()

export class UIEffects {
  constructor(
    public actions$: Actions,
    private uiService: UIService
  ) { }


  @Effect() addUserIDToSocket$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.AddUserIDToSocket),
    map((action: AddUserIDToSocket) => action.payload),
    switchMap((id) => this.uiService.addUserIDToSocket(id).pipe(
      map((res) => new AddUserIDToSocketSuccess(res)),
      catchError((err) => concat(
        Observable.of(new AddUserIDToSocketFail(err)),
        Observable.of(new AddNotify(err))
      ))
    ))
  );

  @Effect() contactUs$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.ContactUs),
    map((action: ContactUs) => action.payload),
    switchMap((contact) => this.uiService.contactUs(contact).pipe(
      mergeMap((res) => concat(
        Observable.of(new ContactUsSuccess(res)),
        Observable.of(new AddNotify(res))
      )),
      catchError((err) => concat(
        Observable.of(new ContactUsFail(err)),
        Observable.of(new AddNotify(err))
      ))
    )));

  @Effect() getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetVersion),
    switchMap(() => this.uiService.getVersion().pipe(
      map((res) => new GetVersionSuccess(res)),
      catchError((err) => concat(
        Observable.of(new GetVersionFail(err)),
        Observable.of(new AddNotify(err))
      ))
    )));
}
