export { OfferClick } from './offer-clicks';
export interface CreditRequest {
  readonly id?: string;
  readonly offerId?: string;
  readonly offerName?: string;
  readonly statusId?: string;
  readonly statusLabel: string;
  readonly completedOn: Date;
  readonly userNotes: string;
  readonly confirmationEmail: string;
  readonly additionalDetails: string;
}
