import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { Order, GetOrderResponse, GetOrdersResponse } from '../models/order';
import { RequestBase } from './request-base';

@Injectable()
export class OrderService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getOrders(): Observable<GetOrdersResponse> {
    return this.http.get(`${API_USER_URL}/getOrders`, this.optionsNoPre)
      .map(res => res.json());
  }

  placeOrder(order: Order): Observable<GetOrderResponse> {
    return this.http.post(`${API_USER_URL}/placeOrder`, order, this.options)
      .map(res => res.json());
  }

}
