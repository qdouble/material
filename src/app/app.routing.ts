/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import {
  AuthGuard,
  LoggedInRedirectGuard
} from './guards';

import { OfferRedirect } from './features/offers';
import { AdminLogin } from './admin-login';

import {
  AboutUs,
  ContactUs,
  CreditRequestComponent,
  FAQ,
  ForgotPassword,
  Homepage,
  HowItWorks,
  Login,
  Logout,
  OfferDetailsComponent,
  Offers,
  OrderComponent,
  PasswordReset,
  Profile,
  Promotions,
  ProofPicGallery,
  Register,
  ReportSpam,
  Status,
  Support,
  ViewTicket
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
    component: Login,
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
    path: 'offer-details',
    component: OfferDetailsComponent,
    canActivate: [AuthGuard]
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
    component: OrderComponent,
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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Support
      },
      {
        path: 'credit-request',
        component: CreditRequestComponent
      },
      {
        path: 'view-ticket',
        component: ViewTicket
      }
    ]
  },
  {
    path: 'terms-and-conditions',
    loadChildren: './features/terms-and-conditions/index#TermsAndConditionsModule'
  },
  {
    path: 'view-offers',
    component: Offers,
    canActivate: [LoggedInRedirectGuard]
  },
  { path: '**', component: NotFound404Component }
];
