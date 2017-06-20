import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_USER_URL } from './constants';
import { Order } from '../models/order';
import { RequestBase } from './request-base';

@Injectable()
export class OrderService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(`${API_USER_URL}/getOrders`, this.optionsNoPre)
      .map(res => res.json());
  }

  placeOrder(order: Order): Observable<Order> {
    return this.http.post(`${API_USER_URL}/placeOrder`, order, this.options)
      .map(res => res.json());
  }

}
