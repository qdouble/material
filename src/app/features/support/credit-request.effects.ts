/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import { AppState } from '../../reducers';
import { CreditRequestService } from './credit-request.service';
import { Go } from '../../actions/router';
import {
  AddCreditRequest,
  AddCreditRequestFail,
  AddCreditRequestSuccess,
  CreditRequestActionTypes,
  EditCreditRequest,
  EditCreditRequestFail,
  EditCreditRequestSuccess,
  GetCreditRequest,
  GetCreditRequestFail,
  GetCreditRequestSuccess,
  GetCreditRequestsFail,
  GetCreditRequestsSuccess,
  GetOfferClicksFail,
  GetOfferClicksSuccess
} from './credit-request.actions';
import { AddNotify } from '../../actions/notify';

@Injectable()
export class CreditRequestEffects {
  constructor(
    public actions$: Actions,
    private creditRequestService: CreditRequestService,
    private store: Store<AppState>
  ) {}

  @Effect()
  addCreditRequest$ = this.actions$.pipe(
    ofType(CreditRequestActionTypes.AddCreditRequest),
    map((action: AddCreditRequest) => action.payload),
    switchMap(creditRequest =>
      this.creditRequestService.addCreditRequest(creditRequest).pipe(
        switchMap(res => concat(of(new AddCreditRequestSuccess(res)), of(new AddNotify(res)))),
        tap(res => {
          if (res.payload.message_type) {
            this.store.dispatch(new Go({ path: ['./support'] }));
          }
        }),
        catchError(err => of(new AddCreditRequestFail(err)))
      )
    )
  );

  @Effect()
  editCreditRequest$ = this.actions$.pipe(
    ofType(CreditRequestActionTypes.EditCreditRequest),
    map((action: EditCreditRequest) => action.payload),
    switchMap(request =>
      this.creditRequestService
        .editCreditRequest(request)
        .pipe(
          mergeMap(res => concat(of(new EditCreditRequestSuccess(res)), of(new AddNotify(res)))),
          catchError(err => of(new EditCreditRequestFail(err)))
        )
    )
  );

  @Effect()
  getCreditRequest$ = this.actions$.pipe(
    ofType(CreditRequestActionTypes.GetCreditRequest),
    map((action: GetCreditRequest) => action.payload),
    switchMap(id =>
      this.creditRequestService
        .getCreditRequest(id)
        .pipe(
          map(res => new GetCreditRequestSuccess(res)),
          catchError(err => of(new GetCreditRequestFail(err)))
        )
    )
  );

  @Effect()
  getCreditRequests$ = this.actions$.pipe(
    ofType(CreditRequestActionTypes.GetCreditRequests),
    switchMap(email =>
      this.creditRequestService
        .getCreditRequests()
        .pipe(
          map(res => new GetCreditRequestsSuccess(res)),
          catchError(err => of(new GetCreditRequestsFail(err)))
        )
    )
  );

  @Effect()
  getOfferClicks$ = this.actions$.pipe(
    ofType(CreditRequestActionTypes.GetOfferClicks),
    switchMap(() =>
      this.creditRequestService
        .getOfferClicks()
        .pipe(
          map(res => new GetOfferClicksSuccess(res)),
          catchError(err => of(new GetOfferClicksFail(err)))
        )
    )
  );
}
