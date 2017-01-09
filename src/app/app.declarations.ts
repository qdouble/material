import { AdminLogin } from './admin-login';
import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PAGES_COMPONENTS } from './features';
import { NotFound404Component } from './not-found404.component';
import { DebounceInputControlValueAccessor } from './validators';

export const APP_DECLARATIONS = [
  AdminLogin,
  PROJECT_COMPONENT_DIRECTIVES,
  PAGES_COMPONENTS,
  NotFound404Component,
  DebounceInputControlValueAccessor
];
