/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { OfferService } from '../services';
import { User } from '../models/user';
import { OfferActions } from '../actions';
import { RouterPatch as router } from './router-patch';

@Injectable()

export class OfferEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private offerService: OfferService,
    private offerActions: OfferActions
  ) { }

  @Effect() getOffers$ = this.updates$
    .whenAction(OfferActions.GET_OFFERS)
    .map<string>(toPayload)
    .switchMap(email => this.offerService.getOffers()
      .map((res: any) => this.offerActions.getOffersSuccess(res))
      .catch((err) => Observable.of(
        this.offerActions.getOffersFail(err)
      ))
    );

}
