import {Routes} from '@ngrx/router';
import {Homepage} from "./pages/home";
import {Login} from './pages/login';
import {Register} from './pages/register';

export const routes: Routes = [
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
  },
  {
   path: '/admin',
   loadComponent: () => new Promise(resolve => {
     (require as any).ensure([], require => {
       resolve(require('./pages/admin/login').AdminLogin)
     })
   })
  }
];

