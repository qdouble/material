import { AdminLogin } from './admin-login';
import { CUSTOM_PIPES } from './pipes';
import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PAGES_COMMON, PAGES_COMPONENTS } from './features';
import { NotFound404Component } from './not-found404.component';
import { DebounceInputControlValueAccessor } from './validators';

export const APP_DECLARATIONS = [
  AdminLogin,
  CUSTOM_PIPES,
  PROJECT_COMPONENT_DIRECTIVES,
  PAGES_COMMON,
  PAGES_COMPONENTS,
  NotFound404Component,
  DebounceInputControlValueAccessor
];
