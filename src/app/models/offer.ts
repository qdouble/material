export interface Offer {
  id?: string;
  displayName?: string;
  subTitle?: string;
  offerURL?: string;
  filename?: string;
  imageURL?: string;
  directImageURL?: string;
  featured?: boolean;
  creditValue?: number;
  costToUser?: number;
  noCardRequired?: boolean;
  offerOrder?: number;
  hideToUnQualifiedUsers?: boolean;
  varies?: boolean;
  versions?: OfferVersion[];
  tempUnavailable?: boolean;
  tempUnavailableMessage?: string;
  description?: string;
  requirements?: string;
  reminder?: string;
  adminNotes?: string;
  affiliate?: string;
  campaignID?: number;
  minTimeToCredit?: number;
  minTimeToCreditType?: string;
  maxTimeToCredit?: number;
  maxTimeToCreditType?: number;
  createdAt?: string;
  updatedAt?: string;
  // Helper Properties //
  viewed?: boolean;
}

export interface OfferVersion {
  label: string;
  costToUser: number;
  commission: number;
  creditValue: number;
  bonus?: boolean;
}
