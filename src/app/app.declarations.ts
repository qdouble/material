import { AdminLogin } from './admin-login';
import { DIALOGS } from './dialogs';
import { DebounceInputControlValueAccessor } from './validators';
import { NotFound404Component } from './not-found404.component';
import { PAGES_COMPONENTS } from './features';
import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PROJECT_DIRECTIVES } from './directives';
import { ReferralDetailsDialog } from './features/status/common/referrals-table/referral-details';

export const APP_DECLARATIONS = [
  AdminLogin,
  DebounceInputControlValueAccessor,
  DIALOGS,
  NotFound404Component,
  PROJECT_COMPONENT_DIRECTIVES,
  PROJECT_DIRECTIVES,
  PAGES_COMPONENTS,
  ReferralDetailsDialog,
];
