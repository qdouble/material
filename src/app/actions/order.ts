/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Order } from '../models/order';

@Injectable()

export class OrderActions {

  static GET_ORDERS = '[Order] Get Orders';
  getOrders(): Action {
    return {
      type: OrderActions.GET_ORDERS
    };
  }

  static GET_ORDERS_FAIL = '[Order] Get Orders Fail';
  getOrdersFail(res: Response): Action {
    return {
      type: OrderActions.GET_ORDERS_FAIL
    };
  }

  static GET_ORDERS_SUCCESS = '[Order] Get Orders Success';
  getOrdersSuccess(orders: Order[]): Action {
    return {
      type: OrderActions.GET_ORDERS_SUCCESS,
      payload: orders
    };
  }

  static PLACE_ORDER = '[Order] Place Order';
  placeOrder(order: Order): Action {
    return {
      type: OrderActions.PLACE_ORDER,
      payload: order
    };
  }

  static PLACE_ORDER_FAIL = '[Order] Place Order Fail';
  placeOrderFail(res: Response): Action {
    return {
      type: OrderActions.PLACE_ORDER_FAIL
    };
  }

  static PLACE_ORDER_SUCCESS = '[Order] Place Order Success';
  placeOrderSuccess(order: Order): Action {
    return {
      type: OrderActions.PLACE_ORDER_SUCCESS,
      payload: order
    };
  }

}
