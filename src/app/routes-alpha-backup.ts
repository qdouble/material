import { RouterConfig } from '@angular/router';
import { Homepage } from "./pages/home";
import { Login } from './pages/login';
import { Register } from './pages/register';

export const routes: RouterConfig = [
  {
    path: '/',
    component:  Homepage
  },
  {
    path: '/login',
    component:  Login
  },
  {
    path: '/register',
    component:  Register
  }
];
