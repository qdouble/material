import { GenericResponse } from './generic-response';

export interface Order {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  State?: string;
  zipCode?: string;
  country?: string;
  paypal?: string;
  selectedPrizeId?: string;
  selectedPrizeName?: string;
  amountPaid?: number;
  totalCost?: number;
  processStatus?: string;
  updatedAt: string;
  createdAt: string;
  // Helper properties //
  viewed?: boolean;
}

export interface GetOrderResponse extends GenericResponse {
  order: Order;
}

export interface GetOrdersResponse extends GenericResponse {
  orders: Order[];
  failedOrders: Order[];
}
