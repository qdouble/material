export { OfferClick } from './offer-click.model';
export interface CreditRequest {
  readonly id?: string;
  readonly offerId?: string;
  readonly offerName?: string;
  readonly status?: string;
  readonly completedOn: Date;
  readonly userNotes: string;
  readonly headers: string;
  readonly body: string;
  readonly additionalDetails: string;
}
