import { GenericResponse } from './generic-response';

export interface ContactUsResponse extends GenericResponse {
  email: string;
  subject: string;
  question: string;
}

export interface GetIPResponse {
  ip: string;
}

export interface GetIPInfoResponse {
  query: string;
  ipType: string;
  businessName: string;
  businessWebsite: string;
  continent: string;
  countryCode: string;
  country: string;
  region: string;
  city: string;
  lat: string;
  lon: string;
  ipName: string;
  org: string;
  isp: string;
  status: string;
  message: string;
}

export interface SortModel {
  sortBy: string;
  reverse: boolean;
}

export interface GetScriptsToLoadResponse {
  scripts: Script[];
}

export interface GetSocialProofResponse {
  proofs: SocialProof[];
}

export interface GetVersionResponse {
  version: string;
}

export interface Script {
  name: string;
  loaded?: boolean;
  loadOn: 'loggedIn' | 'loggedOut' | 'both';
  src: string;
}

export interface SocialProof {
  id: string;
  type: 'join' | 'level' | 'paid' | 'offer';
  userId: string;
  milliseconds: number;
  firstName: string;
  location: string;
  map?: string;
  gravatar?: string;
  level?: number;
  paidAmount?: number;
  offerName?: string;
  offerCredits?: number;
  // Time Stamps //
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface SocialProofSettings {
  id: string;
  duration: number;
  delay: number;
  showSignupGravatar?: boolean;
  repeat: boolean;
  active: boolean;
  // Time Stamps //
  createdAt?: Date;
  updatedAt?: Date;
}
