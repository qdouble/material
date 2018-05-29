import { FooterModule } from './footer';
import { Homepage } from './home';
import { Login } from './login';
import { Logout } from './logout';
import {
  NotificationsComponent,
  NotificationsDropDownComponent,
  NotificationsItemComponent,
  NotificationsPageItemComponent
} from './notifications';
import { PasswordReset } from './password-reset';
import { Profile } from './profile';
import { IPMatchFoundDialog, Register } from './register';

export {
  Homepage,
  IPMatchFoundDialog,
  Login,
  Logout,
  NotificationsComponent,
  NotificationsDropDownComponent,
  NotificationsItemComponent,
  PasswordReset,
  Profile,
  Register
};

export const FEATURE_MODULES = [FooterModule];

export const PAGES_COMPONENTS = [
  Homepage,
  IPMatchFoundDialog,
  Login,
  Logout,
  NotificationsComponent,
  NotificationsDropDownComponent,
  NotificationsItemComponent,
  NotificationsPageItemComponent,
  PasswordReset,
  Profile,
  Register
];
