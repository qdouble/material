import { GenericResponse } from './generic-response';

export interface ContactUsResponse extends GenericResponse {
  email: string;
  subject: string;
  question: string;
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
