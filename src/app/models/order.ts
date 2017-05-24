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
