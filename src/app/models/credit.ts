import { GenericResponse } from './generic-response';

export interface Credit {
  id: string;
  offerName: string;
  offerId: string;
  creditValue: number;
  active: boolean;
  unconfirmed?: boolean;
}

export interface GetCreditResponse extends GenericResponse {
  credit: Credit;
}

export interface GetCreditsResponse extends GenericResponse {
  credits: Credit[];
}
