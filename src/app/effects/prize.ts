import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddNotify } from '../actions/notify';
import { GetPrizesFail, GetPrizesSuccess, PrizeActionTypes } from '../actions/prize';
import { PrizeService } from '../services/prize';

@Injectable()
export class PrizeEffects {
  constructor(public actions$: Actions, private prizeService: PrizeService) {}

  @Effect()
  getPrizes$: Observable<Action> = this.actions$.pipe(
    ofType(PrizeActionTypes.GetPrizes),
    switchMap(email =>
      this.prizeService.getPrizes().pipe(
        map(res => new GetPrizesSuccess(res)),
        catchError(err => concat(of(new GetPrizesFail(err)), of(new AddNotify(err))))
      )
    )
  );
}
