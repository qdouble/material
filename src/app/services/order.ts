import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { Order, GetOrderResponse, GetOrdersResponse } from '../models/order';
import { RequestBase } from './request-base';

@Injectable()
export class OrderService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

  getOrders() {
    return this.http.get<GetOrdersResponse>
      (`${API_USER_URL}/getOrders`, this.optionsNoPre);
  }

  placeOrder(order: Order) {
    return this.http.post<GetOrderResponse>
      (`${API_USER_URL}/placeOrder`, order, this.options);
  }
}
