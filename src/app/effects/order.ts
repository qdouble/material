import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AddNotify } from '../actions/notify';
import {
  GetOrdersFail,
  GetOrdersSuccess,
  OrderActionTypes,
  PlaceOrder,
  PlaceOrderFail,
  PlaceOrderSuccess
} from '../actions/order';
import { SetOrderPending } from '../actions/user';
import { AppState } from '../reducers';
import { OrderService } from '../services/order';

@Injectable()
export class OrderEffects {
  constructor(
    public actions$: Actions,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  @Effect()
  getOrders$: Observable<Action> = this.actions$.pipe(
    ofType(OrderActionTypes.GetOrders),
    switchMap(() =>
      this.orderService.getOrders().pipe(
        map(res => new GetOrdersSuccess(res)),
        catchError(err => concat(of(new GetOrdersFail(err)), of(new AddNotify(err))))
      )
    )
  );

  @Effect()
  placeOrder$: Observable<Action> = this.actions$.pipe(
    ofType(OrderActionTypes.PlaceOrder),
    map((action: PlaceOrder) => action.payload),
    switchMap(order =>
      this.orderService.placeOrder(order).pipe(
        map(res => new PlaceOrderSuccess(res)),
        tap(res => {
          if (res.payload.message_type !== 'success') {
            this.store.dispatch(new AddNotify(res.payload));
          }
          if (res.payload.order) {
            this.store.dispatch(new SetOrderPending(true));
          }
        }),
        catchError(err => concat(of(new PlaceOrderFail(err)), of(new AddNotify(err))))
      )
    )
  );
}
