import { GenericResponse } from '../../models/generic-response';

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

export interface GetOfferClicksResponse extends GenericResponse {
  offerClicks: OfferClick[];
}
