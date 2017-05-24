import { AdminLogin } from './admin-login';
import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PROJECT_DIRECTIVES } from './directives';
import { PAGES_COMPONENTS } from './features';
import { NotFound404Component } from './not-found404.component';
import { DebounceInputControlValueAccessor } from './validators';
import { CompletedOrderDialog } from './features/order/completed-order-dialog';
import { CreditedOfferDialog } from './features/offers/credited-offer.dialog';
import { ReferralDetailsDialog } from './features/status/common/referrals-table/referral-details';

export const APP_DECLARATIONS = [
  AdminLogin,
  CompletedOrderDialog,
  CreditedOfferDialog,
  DebounceInputControlValueAccessor,
  NotFound404Component,
  PROJECT_COMPONENT_DIRECTIVES,
  PROJECT_DIRECTIVES,
  PAGES_COMPONENTS,
  ReferralDetailsDialog,
];
