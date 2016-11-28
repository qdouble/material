/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';

import { AppState } from '../reducers';
import { NotifyActions } from '../actions/notify';
import { CreditRequest } from '../models/credit-request';
import { CreditRequestService } from '../services/credit-request';
import { CreditRequestActions } from '../actions/credit-request';

@Injectable()

export class CreditRequestEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private creditRequestActions: CreditRequestActions,
    private creditRequestService: CreditRequestService,
    private store: Store<AppState>
  ) { }


  @Effect() addCreditRequest$ = this.actions$
    .ofType(CreditRequestActions.ADD_CREDIT_REQUEST)
    .map(action => <CreditRequest>action.payload)
    .switchMap(creditRequest => this.creditRequestService.addCreditRequest(creditRequest)
      .switchMap((res: any) => Observable.of(
        this.creditRequestActions.addCreditRequestSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .do((res: any) => {
        if (res.payload.message_type) {
          this.store.dispatch(go(['./support']));
        }
      })
      .catch((err) => Observable.of(
        this.creditRequestActions.addCreditRequestFail(err)
      ))
    );


  @Effect() getCreditRequest$ = this.actions$
    .ofType(CreditRequestActions.GET_CREDIT_REQUEST)
    .map(action => <string>action.payload)
    .switchMap(id => this.creditRequestService.getCreditRequest(id)
      .map((res) => this.creditRequestActions.getCreditRequestSuccess(res))
      .catch((err) => Observable.of(
        this.creditRequestActions.getCreditRequestFail(err)
      ))
    );

  @Effect() getCreditRequests$ = this.actions$
    .ofType(CreditRequestActions.GET_CREDIT_REQUESTS)
    .map(action => <string>action.payload)
    .switchMap(email => this.creditRequestService.getCreditRequests()
      .map((res: any) => this.creditRequestActions.getCreditRequestsSuccess(res))
      .catch((err) => Observable.of(
        this.creditRequestActions.getCreditRequestsFail(err)
      ))
    );

  @Effect() getOfferClicks$ = this.actions$
    .ofType(CreditRequestActions.GET_OFFER_CLICKS)
    .map(action => <string>action.payload)
    .switchMap(email => this.creditRequestService.getOfferClicks()
      .map((res: any) => this.creditRequestActions.getOfferClicksSuccess(res))
      .catch((err) => Observable.of(
        this.creditRequestActions.getOfferClicksFail(err)
      ))
    );
}
