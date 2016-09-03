import { Routes } from '@angular/router';
import { load } from './shared';
import {
  AuthGuard,
  LoggedInRedirectGuard
} from './guards';

import { OfferRedirect } from './pages/offers';

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

import {
  GetUserProfile,
  ShowAllUsers
} from './resolve';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    canActivate: [LoggedInRedirectGuard]
  },
  {
        path: 'lazy',
        loadChildren: load(() => new Promise(resolve => {
          (require as any).ensure([], require => {
            resolve(require('./test').TestkModule);
          });
        }))
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
    path: 'test-requests',
    component: TestRequests,
    canActivate: [AuthGuard],
    resolve: ShowAllUsers
  },
  {
    path: 'view-offers',
    component: ViewOffers,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
