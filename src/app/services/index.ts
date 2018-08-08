import { CountryService } from './country';
import { NotificationService } from './notification';
import { OfferService } from './offer';
import { OrderService } from './order';
import { PrizeService } from './prize';
import { SWAndPushService } from './sw-and-push';
import { UIService } from './ui';
import { UserService } from './user';
import { LoggingService } from './logging';

export const services = [
  CountryService,
  LoggingService,
  NotificationService,
  OfferService,
  OrderService,
  PrizeService,
  SWAndPushService,
  UIService,
  UserService
];
