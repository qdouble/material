import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { ReferrerBlockedComponent } from './referrer-blocked';
import { AuthGuard, LoggedInRedirectGuard } from './guards';

import { AdminLogin } from './admin-login';

import {
  Homepage,
  Login,
  Logout,
  NotificationsComponent,
  PasswordReset,
  Profile,
  Register
} from './features';

import { GetUserProfile } from './resolve';

export const routes: Routes = [
  {
    path: 'admin-login',
    component: AdminLogin
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [LoggedInRedirectGuard],
    component: Homepage
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
  {
    path: 'offers',
    loadChildren: './features/offers/index#OffersModule'
  },
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
    path: 'register',
    component: Register
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
  { path: '**', component: NotFound404Component }
];
