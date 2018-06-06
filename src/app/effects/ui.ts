import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AddNotify } from '../actions/notify';
import {
  AddInvalidCountry,
  AddInvalidCountryFail,
  AddInvalidCountrySuccess,
  AddUserIDToSocket,
  AddUserIDToSocketFail,
  AddUserIDToSocketSuccess,
  ContactUs,
  ContactUsFail,
  ContactUsSuccess,
  GetIPInfo,
  GetIPInfoFail,
  GetIPInfoSuccess,
  GetScriptsToLoadSuccess,
  GetSocialProof,
  GetSocialProofFail,
  GetSocialProofSettingsFail,
  GetSocialProofSettingsSuccess,
  GetSocialProofSuccess,
  GetVersionFail,
  GetVersionSuccess,
  UIActionTypes
} from '../actions/ui';
import { UIService } from '../services/ui';

@Injectable()
export class UIEffects {
  constructor(public actions$: Actions, private uiService: UIService) {}

  @Effect()
  addInvalidCountry$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.AddInvalidCountry),
    map((action: AddInvalidCountry) => action.payload),
    switchMap(ipInfo =>
      this.uiService.addInvalidCountry(ipInfo).pipe(
        map(res => new AddInvalidCountrySuccess(res)),
        catchError(err => concat(of(new AddInvalidCountryFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  addUserIDToSocket$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.AddUserIDToSocket),
    map((action: AddUserIDToSocket) => action.payload),
    switchMap(id =>
      this.uiService.addUserIDToSocket(id).pipe(
        map(res => new AddUserIDToSocketSuccess(res)),
        catchError(err => concat(of(new AddUserIDToSocketFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  contactUs$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.ContactUs),
    map((action: ContactUs) => action.payload),
    switchMap(contact =>
      this.uiService.contactUs(contact).pipe(
        mergeMap(res => concat(of(new ContactUsSuccess(res)), of(new AddNotify(res)))),
        catchError(err => concat(of(new ContactUsFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getIPInfo$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetIPInfo),
    map((action: GetIPInfo) => action.payload),
    switchMap(ip =>
      this.uiService.getIPInfo(ip).pipe(
        map(res => new GetIPInfoSuccess(res)),
        catchError(err => concat(of(new GetIPInfoFail(err))))
      )
    )
  );

  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetVersion),
    switchMap(() =>
      this.uiService.getVersion().pipe(
        map(res => new GetVersionSuccess(res)),
        catchError(err => concat(of(new GetVersionFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getScriptsToLoad$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetSocialProof),
    switchMap(() =>
      this.uiService.getScriptsToLoad().pipe(
        map(res => new GetScriptsToLoadSuccess(res)),
        catchError(err => concat(of(new GetSocialProofFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getSocialProof$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetSocialProof),
    map((action: GetSocialProof) => action.payload),
    switchMap(type =>
      this.uiService.getSocialProof(type).pipe(
        map(res => new GetSocialProofSuccess(res)),
        catchError(err => concat(of(new GetSocialProofFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getSocialProofSettings$: Observable<Action> = this.actions$.pipe(
    ofType(UIActionTypes.GetSocialProofSettings),
    switchMap(() =>
      this.uiService.getSocialProofSettings().pipe(
        map(res => new GetSocialProofSettingsSuccess(res)),
        catchError(err => concat(of(new GetSocialProofSettingsFail(err)), of(new AddNotify(err))))
      )
    )
  );
}
