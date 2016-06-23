import { Routes } from '@ngrx/router';
import { Homepage } from "./pages/home";
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { TestRequests } from './pages/test-requests';

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
    path: '/profile',
    component:  Profile
  },
  {
    path: '/register',
    component:  Register
  },
  {
    path: '/test-requests',
    component:  TestRequests
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

