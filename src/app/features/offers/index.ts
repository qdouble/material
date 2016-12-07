export * from './offers';
export * from './offer-redirect';
export * from './offer-details';

import { OfferCard } from './offer-card';
import { OfferDetailsComponent, OfferDetailsCard } from './offer-details';
import { OfferRedirect } from './offer-redirect';
import { OfferRows } from './offer-rows';

export const OFFERS_COMMON = [
  OfferCard,
  OfferDetailsComponent,
  OfferDetailsCard,
  OfferRedirect,
  OfferRows
];
