import { GenericResponse } from './generic-response';

export interface ContactUsResponse extends GenericResponse {
  email: string;
  subject: string;
  question: string;
}

export interface GetVersionResponse {
  version: string;
}
