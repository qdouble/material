import { DebounceInput } from './debounce-input';
import { DebounceInputControlValueAccessor } from '../../validators';
import { EmailInput } from './email-input';
import { NumberInput } from './number-input';
import { PasswordInput } from './password-input';
import { SelectInput } from './select-input';
import { TextInput } from './text-input';
import { TextareaInput } from './textarea-input';

export const INPUT_FIELDS = [
  DebounceInput,
  DebounceInputControlValueAccessor,
  EmailInput,
  NumberInput,
  PasswordInput,
  SelectInput,
  TextInput,
  TextareaInput
];
