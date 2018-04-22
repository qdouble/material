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

export interface GetVersionResponse {
  version: string;
}

export interface GetScriptsToLoadResponse {
  scripts: Script[];
}

export interface Script {
  name: string;
  loaded?: boolean;
  loadOn: 'loggedIn' | 'loggedOut' | 'both';
  src: string;
}
