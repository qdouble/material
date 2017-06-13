/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { Order } from '../models/order';
import { NotifyActions } from '../actions/notify';
import { OrderActions } from '../actions/order';
import { UserActions } from '../actions/user';
import { OrderService } from '../services/order';

@Injectable()

export class OrderEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private orderActions: OrderActions,
    private orderService: OrderService,
    private store: Store<AppState>,
    private userActions: UserActions
  ) { }

  @Effect() getOrder$ = this.actions$
    .ofType(OrderActions.GET_ORDER)
    .map(action => <string>action.payload)
    .switchMap(id => this.orderService.getOrder(id)
      .map((res: any) => this.orderActions.getOrderSuccess(res))
      .catch((err) => Observable.of(
        this.orderActions.getOrderFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() getOrders$ = this.actions$
    .ofType(OrderActions.GET_ORDERS)
    .map(action => <string>action.payload)
    .switchMap(() => this.orderService.getOrders()
      .map((res: any) => this.orderActions.getOrdersSuccess(res))
      .catch((err) => Observable.of(
        this.orderActions.getOrdersFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() placeOrder$ = this.actions$
    .ofType(OrderActions.PLACE_ORDER)
    .map(action => <Order>action.payload)
    .switchMap(order => this.orderService.placeOrder(order)
      .map((res: any) => this.orderActions.placeOrderSuccess(res))
      .do(((res) => {
        if (res.payload.message_type !== 'success') {
          this.store.dispatch(this.notifyActions.addNotify(res.payload));
        }
        if (res.payload.order) {
          this.store.dispatch(this.userActions.setOrderPending(true));
        }
      }))
      .catch((err) => Observable.of(
        this.orderActions.placeOrderFail(err),
        this.notifyActions.addNotify(err)
      ))
    );
}
