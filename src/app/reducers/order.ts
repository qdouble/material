/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { OrderActionTypes, OrderActions } from '../actions/order';
import { Order } from '../models/order';

export const adapter = createEntityAdapter<Order>();

export interface State extends EntityState<Order> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  placing: boolean;
}

export const initialState: State = adapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  placing: false
});

export function orderReducer(state = initialState, action: OrderActions): State {
  switch (action.type) {

    case OrderActionTypes.GetOrders:
      return { ...state, loading: true };

    case OrderActionTypes.GetOrdersFail: {
      return { ...state, loading: false };
    }

    case OrderActionTypes.GetOrdersSuccess: {
      const orders = action.payload.orders;
      if (!orders) return { ...state, loading: false };

      return {
        ...adapter.addAll(orders, state),
        loading: false,
        loaded: true
      };
    }

    case OrderActionTypes.PlaceOrder:
      return { ...state, placing: true };
    case OrderActionTypes.PlaceOrderFail:
      return { ...state, placing: false };

    case OrderActionTypes.PlaceOrderSuccess: {
      const order = action.payload.order;
      if (!order) return { ...state, loading: false, placing: false };
      return {
        ...adapter.addOne(order, state),
        loading: false,
        placing: false
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPlacing = (state: State) => state.placing;
