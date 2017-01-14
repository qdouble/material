import { AdminLogin } from './admin-login';
import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PAGES_COMPONENTS } from './features';
import { NotFound404Component } from './not-found404.component';
import { DebounceInputControlValueAccessor } from './validators';
import { CreditedOfferDialog } from './features/offers/credited-offer.dialog';
import { ReferralDetailsDialog } from './features/status/common/referrals-table/referral-details';

export const APP_DECLARATIONS = [
  CreditedOfferDialog,
  ReferralDetailsDialog,
  AdminLogin,
  PROJECT_COMPONENT_DIRECTIVES,
  PAGES_COMPONENTS,
  NotFound404Component,
  DebounceInputControlValueAccessor
];
