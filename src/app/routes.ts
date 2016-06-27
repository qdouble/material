import { RouterConfig } from '@angular/router';

import { AuthGuard } from './guards';
import { LoggedInRedirectGuard } from './guards';

import { Homepage } from "./pages/home";
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { TestRequests } from './pages/test-requests';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    terminal: true
  },
  {
    path: 'home',
    component:  Homepage,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'login',
    component:  Login,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'profile',
    component:  Profile,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component:  Register,
    canActivate: [LoggedInRedirectGuard]
  },
  {
    path: 'test-requests',
    component:  TestRequests,
    canActivate: [AuthGuard]
  }
];
