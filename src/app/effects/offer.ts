/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { OfferActions } from '../actions/offer';
import { OfferService } from '../services/offer';

@Injectable()

export class OfferEffects {
  constructor(
    public actions$: Actions,
    private offerActions: OfferActions,
    private offerService: OfferService,
    private store: Store<AppState>
  ) { }

  @Effect() getOffers$ = this.actions$
    .ofType(OfferActions.GET_OFFERS)
    .map(action => <string>action.payload)
    .switchMap(email => this.offerService.getOffers()
      .map((res: any) => this.offerActions.getOffersSuccess(res))
      .catch((err) => Observable.of(
        this.offerActions.getOffersFail(err)
      ))
    );
}
