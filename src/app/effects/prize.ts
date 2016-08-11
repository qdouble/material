/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { PrizeService } from '../services';
import { User } from '../models/user';
import { PrizeActions } from '../actions';

@Injectable()

export class PrizeEffects {
  constructor(
    private prizeActions: PrizeActions,
    private prizeService: PrizeService,
    private updates$: StateUpdates<AppState>
  ) { }

  @Effect() getPrizes$ = this.updates$
    .whenAction(PrizeActions.GET_PRIZES)
    .map<string>(toPayload)
    .switchMap(email => this.prizeService.getPrizes()
      .map((res: any) => this.prizeActions.getPrizesSuccess(res))
      .catch((err) => Observable.of(
        this.prizeActions.getPrizesFail(err)
      ))
    );

}
