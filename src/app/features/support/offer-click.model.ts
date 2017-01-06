export interface OfferClick {
  _id: string;
  id: string;
  creditValue: number;
  name: string;
  offerId: string;
  userId: string;
  // Helper functions //
  save?: any;
}
