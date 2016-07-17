import { RouterPatch } from './router-patch';
import { OfferEffects } from './offer';
import { PrizeEffects } from './prize';
import { TestRequestEffects } from './test-requests';
import { UserEffects } from './user';


export default [
  OfferEffects,
  PrizeEffects,
  UserEffects,
  TestRequestEffects
];

export {
  RouterPatch
}
