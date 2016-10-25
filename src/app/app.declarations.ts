import { PROJECT_COMPONENT_DIRECTIVES } from './components';
import { PAGES_COMMON, PAGES_COMPONENTS } from './features';
import { NotFound404Component } from './not-found404.component';
import { DebounceInputControlValueAccessor } from './validators';

export const APP_DECLARATIONS = [
  PROJECT_COMPONENT_DIRECTIVES,
  PAGES_COMMON,
  PAGES_COMPONENTS,
  NotFound404Component,
  DebounceInputControlValueAccessor
];
