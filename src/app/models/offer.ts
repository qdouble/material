export interface Offer {
  id?: string;
  displayName?: string;
  subTitle?: string;
  offerURL?: string;
  imageURL?: string;
  featured?: boolean;
  offerOrder?: number;
  description?: string;
  requirements?: string;
  adminNotes?: string;
  affiliate?: string;
  campaignID?: number;
  minTimeToCredit?: number;
  minTimeToCreditType?: string;
  maxTimeToCredit?: number;
  maxTimeToCreditType?: number;
}
