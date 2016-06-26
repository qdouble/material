import { RouterConfig } from '@angular/router';
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
    terminal: true
  },
  {
    path: 'login',
    component:  Login
  },
  {
    path: 'profile',
    component:  Profile
  },
  {
    path: 'register',
    component:  Register
  },
  {
    path: 'test-requests',
    component:  TestRequests
  }
];
