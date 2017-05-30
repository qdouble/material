import { CompletedOrderDialog } from './features/order/completed-order-dialog';
import { CreditedOfferDialog } from './features/offers/credited-offer.dialog';
import { DIALOGS } from './dialogs';
import { IPMatchFoundDialog } from './features';
import { ReferralDetailsDialog } from './features/status/common/referrals-table/referral-details';

export const APP_ENTRY_COMPONENTS = [
  CompletedOrderDialog,
  CreditedOfferDialog,
  DIALOGS,
  IPMatchFoundDialog,
  ReferralDetailsDialog
];
