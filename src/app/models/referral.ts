import { Credit } from './credit';

export interface Referral {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly currentLevel: number;
  readonly payBeyondLevel: number;
  readonly leveledUp: boolean;
  readonly levels: number[][];
  readonly addedOn: Date;
  readonly transferredOn: Date;
  readonly currentSponsor: boolean;
  readonly active: boolean;
  readonly hold: boolean;
  readonly holdReason: string;
  readonly credits: Credit[];
  readonly removed?: boolean;
  readonly hidden?: boolean;
}
