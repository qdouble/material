/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import {
  AuthGuard,
  LoggedInRedirectGuard
} from './guards';

import { OfferRedirect } from './features/offers';

import {
  AboutUs,
  ContactUs,
  FAQ,
  Homepage,
  HowItWorks,
  Login,
  Logout,
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
  ViewOffers
}  from './features';

import {
  GetUserProfile
} from './resolve';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    canActivate: [LoggedInRedirectGuard]
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
    path: 'logout',
    component: Logout
  },
  {
    path: 'offers',
    component: Offers,
    canActivate: [AuthGuard]
  },
  {
    path: 'offer-redirect',
    component: OfferRedirect
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
    canActivate: [AuthGuard],
    resolve: [GetUserProfile]
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
    path: 'view-offers',
    component: ViewOffers,
    canActivate: [LoggedInRedirectGuard]
  },
  { path: '**', component: NotFound404Component }
];
