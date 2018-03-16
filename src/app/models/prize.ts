import { GenericResponse } from './generic-response';

export interface Prize {
  readonly id?: string;
  readonly name?: string;
  readonly imageUrl?: string;
  readonly orderOptions?: string;
  readonly description?: string;
  readonly userMessage?: string;
  readonly prizeValue?: string;
  readonly referralsRequired?: number;
}

export interface ChangeSelectedPrizeResponse extends GenericResponse {
  id: string;
}

export interface CheckIfUserUpdatedAtResponse extends GenericResponse {
  updatedAt: string;
}

export interface CheckIPMatchResponse extends GenericResponse {
  matches: boolean;
  ip: string;
  ipJson: any;
}

export interface CheckReferrerUsernameResponse extends GenericResponse {
  blocked?: boolean;
}

export interface DismissProfileChangesResponse extends GenericResponse {
  dismissed: boolean;
}

export interface GetPrizesResponse extends GenericResponse {
  prizes: Prize[];
}

export interface HideReferralsResponse extends GenericResponse {
  ids: string[];
  hide: boolean;
}

export interface RemoveReferralsResponse extends GenericResponse {
  ids: string[];
}

export interface SetSponsorResponse extends GenericResponse {
  currentSponsor: string;
  currentSponsorEmail: string;
}
