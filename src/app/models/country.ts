import { GenericResponse } from './generic-response';

export interface Country {
  id: string;
  displayName: string;
  countryId: string;
  active: boolean;
}

export interface GetCountryResponse extends GenericResponse {
  country: Country;
}

export interface GetCountriesResponse extends GenericResponse {
  countries: Country[];
}
