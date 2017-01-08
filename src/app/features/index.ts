import { AboutUs } from './about-us';
import { ForgotPassword } from './forgot-password';
import { FooterModule } from './footer';
import { Homepage } from './home';
import { HowItWorks } from './how-it-works';
import { Login } from './login';
import { Logout } from './logout';
import { MessagesComponent } from './messages';
import { NotificationsComponent } from './notifications';
import { OfferDetailsComponent, Offers, OFFERS_COMMON } from './offers';
import { OrderComponent, OrderFormComponent, OrderTableComponent } from './order';
import { PasswordReset } from './password-reset';
import { Profile } from './profile';
import { Promotions } from './promotions';
import { ProofPicGallery } from './proof-pic-gallery';
import { IPMatchFoundDialog, Register } from './register';
import { ReportSpam } from './report-spam';
import { ReferralDetailsDialog, ReferralsTable, SelectedPrizeComponent, Status } from './status';

export {
  AboutUs,
  ForgotPassword,
  Homepage,
  HowItWorks,
  IPMatchFoundDialog,
  Login,
  Logout,
  MessagesComponent,
  NotificationsComponent,
  Offers,
  OfferDetailsComponent,
  OrderComponent,
  PasswordReset,
  Profile,
  Promotions,
  ProofPicGallery,
  ReferralDetailsDialog,
  Register,
  ReportSpam,
  Status
}

export const FEATURE_MODULES = [
  FooterModule
];

export const PAGES_COMMON = [
  OFFERS_COMMON
];

export const PAGES_COMPONENTS = [
  AboutUs,
  ForgotPassword,
  Homepage,
  HowItWorks,
  IPMatchFoundDialog,
  Login,
  Logout,
  MessagesComponent,
  NotificationsComponent,
  Offers,
  OrderComponent,
  OrderFormComponent,
  OrderTableComponent,
  PasswordReset,
  Profile,
  Promotions,
  ProofPicGallery,
  ReferralDetailsDialog,
  ReferralsTable,
  Register,
  ReportSpam,
  SelectedPrizeComponent,
  Status
];
