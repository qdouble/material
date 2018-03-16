/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { concat } from 'rxjs/observable/concat';
import {
  tap,
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { AppState } from '../reducers';
import { AddNotify } from '../actions/notify';
import {
  GetOrdersFail,
  GetOrdersSuccess,
  PlaceOrder,
  PlaceOrderFail,
  PlaceOrderSuccess,
  OrderActionTypes
} from '../actions/order';
import { SetOrderPending } from '../actions/user';
import { OrderService } from '../services/order';

@Injectable()

export class OrderEffects {
  constructor(
    public actions$: Actions,
    private orderService: OrderService,
    private store: Store<AppState>
  ) { }

  @Effect() getOrders$: Observable<Action> = this.actions$.pipe(
    ofType(OrderActionTypes.GetOrders),
    switchMap(() => this.orderService.getOrders().pipe(
      map((res) => new GetOrdersSuccess(res)),
      catchError((err) => concat(
        Observable.of(new GetOrdersFail(err)),
        Observable.of(new AddNotify(err))
      ))
    )));

  @Effect() placeOrder$: Observable<Action> = this.actions$.pipe(
    ofType(OrderActionTypes.PlaceOrder),
    map((action: PlaceOrder) => action.payload),
    switchMap(order => this.orderService.placeOrder(order).pipe(
      map((res) => new PlaceOrderSuccess(res)),
      tap(((res) => {
        if (res.payload.message_type !== 'success') {
          this.store.dispatch(new AddNotify(res.payload));
        }
        if (res.payload.order) {
          this.store.dispatch(new SetOrderPending(true));
        }
      })),
      catchError((err) => concat(
        Observable.of(new PlaceOrderFail(err)),
        Observable.of(new AddNotify(err))
      ))
    )));
}
