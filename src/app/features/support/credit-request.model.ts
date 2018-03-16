import { GenericResponse } from '../../models/generic-response';

export { OfferClick } from './offer-click.model';
export interface CreditRequest {
  id?: string;
  readonly offerId?: string;
  readonly offerName?: string;
  readonly status?: string;
  readonly completedOn: Date;
  readonly userNotes: string;
  readonly headers: string;
  readonly body: string;
  readonly additionalDetails: string;
}

export interface GetCreditRequestResponse extends GenericResponse {
  id: string;
  creditRequest: CreditRequest;
}

export interface GetCreditRequestResponse extends GenericResponse {
  creditRequests: CreditRequest;
}

export interface GetCreditRequestsResponse extends GenericResponse {
  creditRequests: CreditRequest[];
}
