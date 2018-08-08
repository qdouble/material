import { Routes } from '@angular/router';

import { CreditRequestComponent } from './credit-request';
import { Support } from './support';
import { ViewTicket } from './view-ticket';

export const routes: Routes = [
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
];
