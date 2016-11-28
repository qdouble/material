export interface Referral {
  readonly id: string;
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
}
