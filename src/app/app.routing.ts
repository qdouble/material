/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { ReferrerBlockedComponent } from './referrer-blocked';
import {
  AuthGuard,
  AuthRegGuard,
  LoggedInRedirectGuard
} from './guards';

import { AdminLogin } from './admin-login';

import {
  AboutUs,
  ForgotPassword,
  // Homepage,
  HowItWorks,
  Login,
  Logout,
  NotificationsComponent,
  PasswordReset,
  Profile,
  Promotions,
  ProofPicGallery,
  Register,
  ReportSpam
}  from './features';

import {
  GetUserProfile
} from './resolve';

export const routes: Routes = [
  {
    path: 'admin-login',
    component: AdminLogin
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './features/status/index#StatusModule',
    canActivate: [AuthRegGuard]
  },
  {
    path: 'about-us',
    component: AboutUs
  },
  {
    path: 'contact-us',
    canActivate: [LoggedInRedirectGuard],
    loadChildren: './features/contact-us/index#ContactUsModule'
  },
  {
    path: 'crediting-guidelines',
    loadChildren: './features/crediting-guidelines/index#CreditingGuidelinesModule'
  },
  {
    path: 'faq',
    loadChildren: './features/faq/index#FAQModule'
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
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
    path: 'notifications',
    component: NotificationsComponent
  },
  // {
  //   path: 'offer-details',
  //   component: OfferDetailsComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'offers',
    loadChildren: './features/offers/index#OffersModule'
    // component: Offers,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'offer-redirect',
  //   component: OfferRedirect
  // },
    {
    path: 'referrer-blocked',
    component: ReferrerBlockedComponent
  },
  {
    path: 'payments',
    loadChildren: './features/order/index#OrderModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'password-reset',
    component: PasswordReset,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'privacy-policy',
    loadChildren: './features/privacy-policy/index#PrivacyPolicyModule'
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
    // canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'report-spam',
    component: ReportSpam
  },
  {
    path: 'status',
    loadChildren: './features/status/index#StatusModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    canActivate: [AuthGuard],
    loadChildren: './features/support/index#SupportModule'
  },
  {
    path: 'terms-and-conditions',
    loadChildren: './features/terms-and-conditions/index#TermsAndConditionsModule'
  },
  // {
  //   path: 'view-offers',
  //   component: Offers,
  //   canActivate: [LoggedInRedirectGuard]
  // },
  { path: '**', component: NotFound404Component }
];
