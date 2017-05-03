/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { NotifyActions } from '../actions/notify';
import { PrizeService } from '../services/prize';
import { PrizeActions } from '../actions/prize';

@Injectable()

export class PrizeEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private prizeActions: PrizeActions,
    private prizeService: PrizeService,
    private store: Store<AppState>
  ) { }

  @Effect() getPrizes$ = this.actions$
    .ofType(PrizeActions.GET_PRIZES)
    .map(action => <string>action.payload)
    .switchMap(email => this.prizeService.getPrizes()
      .map((res: any) => this.prizeActions.getPrizesSuccess(res))
      .catch((err) => Observable.of(
        this.prizeActions.getPrizesFail(err),
        this.notifyActions.addNotify(err)
      ))
    );
}
