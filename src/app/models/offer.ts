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
  notATrial?: boolean;
  offerOrder?: number;
  hideToUnQualifiedUsers?: boolean;
  qualificationLevel?: number;
  varies?: boolean;
  versions?: OfferVersion[];
  alternateVersions?: string[];
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
  displayYoutube?: boolean;
  youtubeID?: string;
  restrictDevices?: boolean;
  android?: boolean;
  IOS?: boolean;
  mobile?: boolean;
  desktop?: boolean;
  windows?: boolean;
  mac?: boolean;
  popularityRank?: number;
  popularityRank2?: number;
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
