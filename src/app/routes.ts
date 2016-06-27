import { RouterConfig } from '@angular/router';

import {
  AuthGuard,
  LoggedInRedirectGuard
} from './guards';

import {
  AboutUs,
  ContactUs,
  FAQ,
  Homepage,
  HowItWorks,
  Login,
  Offers,
  Order,
  Profile,
  PrivacyPolicy,
  Promotions,
  ProofPicGallery,
  Register,
  ReportSpam,
  Status,
  Support,
  TermsAndConditions,
  TestRequests,
  ViewOffers
}  from './pages';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    terminal: true
  },
  {
    path: 'about-us',
    component: AboutUs
  },
  {
    path: 'contact-us',
    component: ContactUs
  },
  {
    path: 'faq',
    component: FAQ,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'home',
    component: Homepage,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'how-it-works',
    component: HowItWorks,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'login',
    component: Login,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'offers',
    component: Offers,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: Order,
    canActivate: [AuthGuard]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [AuthGuard]
  },
  {
    path: 'promotions',
    component: Promotions
  },
  {
    path: 'proof-pic-gallery',
    component: ProofPicGallery
  },
  {
    path: 'register',
    component: Register,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'report-spam',
    component: ReportSpam
  },
  {
    path: 'status',
    component: Status,
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    component: Support,
    canActivate: [AuthGuard]
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditions
  },
  {
    path: 'test-requests',
    component: TestRequests,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-offers',
    component: ViewOffers,
    canActivate: [LoggedInRedirectGuard]
  }
];
