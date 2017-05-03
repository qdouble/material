/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { NotifyActions } from '../actions/notify';
import { OfferActions } from '../actions/offer';
import { OfferService } from '../services/offer';

@Injectable()

export class OfferEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private offerActions: OfferActions,
    private offerService: OfferService,
    private store: Store<AppState>
  ) { }

  @Effect() getOffer$ = this.actions$
    .ofType(OfferActions.GET_OFFER)
    .map(action => <string>action.payload)
    .switchMap(id => this.offerService.getOffer(id)
      .map((res: any) => this.offerActions.getOfferSuccess(res))
      .catch((err) => Observable.of(
        this.offerActions.getOfferFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() getOffers$ = this.actions$
    .ofType(OfferActions.GET_OFFERS)
    .map(action => <string>action.payload)
    .switchMap(() => this.offerService.getOffers()
      .map((res: any) => this.offerActions.getOffersSuccess(res))
      .catch((err) => Observable.of(
        this.offerActions.getOffersFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() getViewOffers$ = this.actions$
    .ofType(OfferActions.GET_VIEW_OFFERS)
    .map(action => <string>action.payload)
    .switchMap(email => this.offerService.getViewOffers()
      .map((res: any) => this.offerActions.getOffersSuccess(res))
      .catch((err) => Observable.of(
        this.offerActions.getOffersFail(err),
        this.notifyActions.addNotify(err)
      ))
    );
}
