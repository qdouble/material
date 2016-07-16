import { RouterPatch } from './router-patch';
import { PrizeEffects } from './prize';
import { TestRequestEffects } from './test-requests';
import { UserEffects } from './user';


export default [
  PrizeEffects,
  UserEffects,
  TestRequestEffects
];

export {
  RouterPatch
}
