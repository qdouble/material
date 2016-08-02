export * from './input-fields';
export * from './prize-item';
export * from './prizes-display';

import { INPUT_FIELDS } from './input-fields';
import { PrizeItem } from './prize-item';
import { PrizesDisplay } from './prizes-display';

export const PROJECT_DIRECTIVES = [
  INPUT_FIELDS,
  PrizeItem,
  PrizesDisplay
];
