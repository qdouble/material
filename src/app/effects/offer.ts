import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddNotify } from '../actions/notify';
import {
  GetOffer,
  GetOfferFail,
  GetOffersFail,
  GetOffersSuccess,
  GetOfferSuccess,
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
      this.offerService.getOffer(id).pipe(
        map(res => new GetOfferSuccess(res)),
        catchError(err => concat(of(new GetOfferFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getOffers$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetOffers),
    switchMap(() =>
      this.offerService.getOffers().pipe(
        map(res => new GetOffersSuccess(res)),
        catchError(err => concat(of(new GetOffersFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  getOffersUpdatedAt$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetOffersUpdatedAt),
    switchMap(() =>
      this.offerService.getOffersUpdatedAt().pipe(
        map(res => new GetOffersUpdatedAtSuccess(res)),
        catchError(err => of(new GetOffersUpdatedAtFail(err)))
      )
    )
  );

  @Effect()
  getViewOffers$: Observable<Action> = this.actions$.pipe(
    ofType(OfferActionTypes.GetViewOffers),
    switchMap(() =>
      this.offerService.getViewOffers().pipe(
        map(res => new GetOffersSuccess(res)),
        catchError(err => concat(of(new GetOffersFail(err)), of(new AddNotify(err))))
      )
    )
  );
}
