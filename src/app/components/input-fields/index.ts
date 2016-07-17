export * from './debounce-input';
export * from './email-input';
export * from './number-input';
export * from './password-input';
export * from './select-input';
export * from './text-input';
export * from './textarea-input';

import { DebounceInput } from './debounce-input';
import { EmailInput } from './email-input';
import { NumberInput } from './number-input';
import { PasswordInput } from './password-input';
import { SelectInput } from './select-input';
import { TextInput } from './text-input';
import { TextareaInput } from './textarea-input';

export const INPUT_FIELDS = [
  DebounceInput,
  EmailInput,
  NumberInput,
  PasswordInput,
  SelectInput,
  TextInput,
  TextareaInput
];
