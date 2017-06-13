/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import { OrderActions } from '../actions/order';
import { Order } from '../models/order';

export interface OrderState {
  ids: string[];
  entities: { [id: string]: Order };
  loading: boolean;
  loaded: boolean;
  placing: boolean;
}

export const initialState: OrderState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  placing: false
};

export function orderReducer(state = initialState, action: Action): OrderState {
  switch (action.type) {

    case OrderActions.GET_ORDER:
    case OrderActions.GET_ORDERS:
      return Object.assign({}, state, { loading: true });

    case OrderActions.GET_ORDER_FAIL:
    case OrderActions.GET_ORDERS_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case OrderActions.PLACE_ORDER_SUCCESS:
    case OrderActions.GET_ORDER_SUCCESS: {
      const order: Order = action.payload.order;
      if (!order) return Object.assign({}, state, { loading: false, placing: false });
      const newOrderIds = [...state.ids];
      if (!state.ids.includes(order.id)) {
        newOrderIds.unshift(order.id);
      }
      return Object.assign({}, state, {
        ids: newOrderIds,
        entities: Object.assign({}, state.entities, {
          [order.id]: order
        }),
        loading: false,
        placing: false
      });
    }

    case OrderActions.GET_ORDERS_SUCCESS: {
      const orders: Order[] = action.payload.orders;
      if (!orders) return Object.assign({}, state, { loading: false });
      if (state.loaded) {
        const newOrders: Order[] = orders.filter(order => !state.entities[order.id!]);
        const newOrderIds: string[] = newOrders.map(order => order.id!);
        const newOrderEntities = newOrders.reduce(
          (entities: { [id: string]: Order }, order: Order) => {
            if (order.id)
              return Object.assign(entities, {
                [order.id]: order
              });
          }, {});

        return Object.assign({}, state, {
          ids: [...state.ids, ...newOrderIds],
          entities: Object.assign({}, state.entities, newOrderEntities),
          loading: false,
          loaded: true
        });
      }

      const newOrders: Order[] = orders;
      const orderIds: string[] = newOrders.map(order => order.id!);
      const orderEntities = newOrders.reduce(
        (entities: { [id: string]: Order }, order: Order) => {
          if (order.id)
            return Object.assign(entities, {
              [order.id]: order
            });
        }, {});

      return Object.assign({}, state, {
        ids: [...orderIds],
        entities: orderEntities,
        loading: false,
        loaded: true
      });
    }

    case OrderActions.PLACE_ORDER:
      return Object.assign({}, state, { placing: true });
    case OrderActions.PLACE_ORDER_FAIL:
      return Object.assign({}, state, { placing: false });

    default: {
      return state;
    }
  }
}

function _getLoaded() {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.loading);
}

function _getPlacing() {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.placing);
}

function _getOrderEntities() {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.entities);
}

function _getOrder(id: string) {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.entities[id]);
}

function _getOrders(orderIds: string[]) {
  return (state$: Observable<OrderState>) => state$
    .let(_getOrderEntities())
    .map(entities => orderIds.map(id => entities[id]));
}

function _getOrderIds() {
  return (state$: Observable<OrderState>) => state$
    .select(s => s.ids);
}


function _getOrderState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.order);
}

export function getOrder(id: string) {
  return compose(_getOrder(id), _getOrderState());
}

export function getOrders(orderIds: string[]) {
  return compose(_getOrders(orderIds), _getOrderState());
}

export function getOrderIds() {
  return compose(_getOrderIds(), _getOrderState());
}

export function getOrderEntities() {
  return compose(_getOrderEntities(), _getOrderState());
}

export function getOrderLoaded() {
  return compose(_getLoaded(), _getOrderState());
}

export function getOrderLoading() {
  return compose(_getLoading(), _getOrderState());
}

export function getOrderPlacing() {
  return compose(_getPlacing(), _getOrderState());
}

export function getOrderCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getOrderIds())
    .switchMap(orderId => state$.let(getOrders(orderId)));
}
