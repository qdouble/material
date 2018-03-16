import { Action } from '@ngrx/store';

import { Order, GetOrdersResponse, GetOrderResponse } from '../models/order';

export enum OrderActionTypes {
  GetOrders = '[Order] Get Orders',
  GetOrdersFail = '[Order] Get Orders Fail',
  GetOrdersSuccess = '[Order] Get Orders Success',
  PlaceOrder = '[Order] Place Order',
  PlaceOrderFail = '[Order] Place Order Fail',
  PlaceOrderSuccess = '[Order] Place Order Success',
}

export class GetOrders implements Action {
  readonly type = OrderActionTypes.GetOrders;
}

export class GetOrdersFail implements Action {
  readonly type = OrderActionTypes.GetOrdersFail;

  constructor(public payload: Error) { }
}

export class GetOrdersSuccess implements Action {
  readonly type = OrderActionTypes.GetOrdersSuccess;

  constructor(public payload: GetOrdersResponse) { }
}

export class PlaceOrder implements Action {
  readonly type = OrderActionTypes.PlaceOrder;

  constructor(public payload: Order) { }
}

export class PlaceOrderFail implements Action {
  readonly type = OrderActionTypes.PlaceOrderFail;

  constructor(public payload: Error) { }
}

export class PlaceOrderSuccess implements Action {
  readonly type = OrderActionTypes.PlaceOrderSuccess;

  constructor(public payload: GetOrderResponse) { }
}

export type OrderActions =
| GetOrders
| GetOrdersFail
| GetOrdersSuccess
| PlaceOrder
| PlaceOrderFail
| PlaceOrderSuccess;
