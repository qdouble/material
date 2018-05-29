/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AddNotify } from '../actions/notify';
import { PrizeService } from '../services/prize';
import { GetPrizesFail, GetPrizesSuccess, PrizeActionTypes } from '../actions/prize';

@Injectable()
export class PrizeEffects {
  constructor(public actions$: Actions, private prizeService: PrizeService) {}

  @Effect()
  getPrizes$: Observable<Action> = this.actions$.pipe(
    ofType(PrizeActionTypes.GetPrizes),
    switchMap(email =>
      this.prizeService
        .getPrizes()
        .pipe(
          map(res => new GetPrizesSuccess(res)),
          catchError(err =>
            concat(Observable.of(new GetPrizesFail(err)), Observable.of(new AddNotify(err)))
          )
        )
    )
  );
}
