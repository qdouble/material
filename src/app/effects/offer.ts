/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';

import { AddNotify } from '../actions/notify';
import {
  GetOffer,
  GetOfferFail,
  GetOfferSuccess,
  GetOffersFail,
  GetOffersSuccess,
  GetOffersUpdatedAtFail,
  GetOffersUpdatedAtSuccess,
  OfferActionTypes
} from '../actions/offer';
import { OfferService } from '../services/offer';

@Injectable()
export class OfferEffects {
  constructor(public actions$: Actions, private offerService: OfferService) {}

  @Effect()
  getOffer$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetOffer),
    map((action: GetOffer) => action.payload),
    switchMap(id =>
      this.offerService
        .getOffer(id)
        .pipe(
          map(res => new GetOfferSuccess(res)),
          catchError(err =>
            concat(Observable.of(new GetOfferFail(err)), Observable.of(new AddNotify(err)))
          )
        )
    )
  );

  @Effect()
  getOffers$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetOffers),
    switchMap(() =>
      this.offerService
        .getOffers()
        .pipe(
          map(res => new GetOffersSuccess(res)),
          catchError(err =>
            concat(Observable.of(new GetOffersFail(err)), Observable.of(new AddNotify(err)))
          )
        )
    )
  );

  @Effect()
  getOffersUpdatedAt$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetOffersUpdatedAt),
    switchMap(() =>
      this.offerService
        .getOffersUpdatedAt()
        .pipe(
          map(res => new GetOffersUpdatedAtSuccess(res)),
          catchError(err => Observable.of(new GetOffersUpdatedAtFail(err)))
        )
    )
  );

  @Effect()
  getViewOffers$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetViewOffers),
    switchMap(email =>
      this.offerService
        .getViewOffers()
        .pipe(
          map(res => new GetOffersSuccess(res)),
          catchError(err =>
            concat(Observable.of(new GetOffersFail(err)), Observable.of(new AddNotify(err)))
          )
        )
    )
  );
}
