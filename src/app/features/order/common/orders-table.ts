import { Component, Input } from '@angular/core';

import { Order } from '../../../models/order';

@Component({
  selector: 'os-orders-table',
  templateUrl: './orders-table.html',
  styleUrls: ['./orders-table.css']
})

export class OrderTableComponent {
  @Input() loaded: boolean;
  @Input() orders: Order[];
  trackById(index: number, order: Order) {
    return order.id;
  }
}
