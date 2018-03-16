import { GenericResponse } from './generic-response';

export interface IP {
  ip: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  asn: string;
  org: string;
}

export interface GetIP extends GenericResponse {
  ip: IP;
}
