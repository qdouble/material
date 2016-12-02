/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Country } from '../models/country';

@Injectable()

export class CountryActions {
  static GET_COUNTRIES = '[Country] Get Countries';
  getCountries(): Action {
    return {
      type: CountryActions.GET_COUNTRIES
    };
  }

  static GET_COUNTRIES_FAIL = '[Country] Get Countries Fail';
  getCountriesFail(res: Response): Action {
    return {
      type: CountryActions.GET_COUNTRIES_FAIL
    };
  }

  static GET_COUNTRIES_SUCCESS = '[Country] Get Countries Success';
  getCountriesSuccess(countries: Country): Action {
    return {
      type: CountryActions.GET_COUNTRIES_SUCCESS,
      payload: countries
    };
  }

}
