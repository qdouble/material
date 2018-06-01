import { Credit } from './credit';
import { GenericResponse } from './generic-response';

export interface Referral {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly currentLevel: number;
  readonly unpaidLevels?: number;
  readonly payBeyondLevel: number;
  readonly leveledUp: boolean;
  readonly levels: number[][];
  readonly addedOn: string;
  readonly transferredOn: string;
  readonly currentSponsor: boolean;
  readonly active: boolean;
  readonly hold: boolean;
  readonly holdReason: string;
  readonly credits: Credit[];
  readonly removed?: boolean;
  readonly hidden?: boolean;
}

export interface GetReferral extends GenericResponse {
  referral: Referral;
}

export interface GetReferrals extends GenericResponse {
  referrals: Referral[];
}
