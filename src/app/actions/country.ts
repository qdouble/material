import { Action } from '@ngrx/store';

import { GetCountriesResponse } from '../models/country';

export enum CountryActionTypes {
  GetCountries = '[Country] Get Countries',
  GetCountriesFail = '[Country] Get Countries Fail',
  GetCountriesSuccess = '[Country] Get Countries Success',
  Select = '[Country] Select'
}

export class GetCountries implements Action {
  readonly type = CountryActionTypes.GetCountries;

  constructor() {}
}

export class GetCountriesFail implements Action {
  readonly type = CountryActionTypes.GetCountriesFail;

  constructor(public payload: Error) {}
}

export class GetCountriesSuccess implements Action {
  readonly type = CountryActionTypes.GetCountriesSuccess;

  constructor(public payload: GetCountriesResponse) {}
}

export class Select implements Action {
  readonly type = CountryActionTypes.Select;

  constructor(public payload: string) {}
}

export type CountryActions = GetCountries | GetCountriesFail | GetCountriesSuccess | Select;
