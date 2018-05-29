import { Routes } from '@angular/router';
import { AuthGuard, LoggedInRedirectGuard } from '../../guards';

import { Offers } from './offers';
import { OfferDetailsComponent } from './offer-details';
import { OfferRedirect } from './offer-redirect';

export const routes: Routes = [
  {
    path: '',
    component: Offers,
    canActivate: [AuthGuard]
  },
  {
    path: 'offer-details',
    component: OfferDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'offer-redirect',
    component: OfferRedirect
  },
  {
    path: 'view-offers',
    component: Offers,
    canActivate: [LoggedInRedirectGuard]
  }
];
