/* tslint:disable: no-switch-case-fall-through */
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import { CountryActions } from '../actions/country';
import { Country } from '../models/country';

import { compareOrder } from '../helper/compare-order';

export interface CountryState {
  ids: string[];
  entities: { [id: string]: Country };
  loading: boolean;
  loaded: boolean;
  selectedCountry: string | null;
};

export const initialState: CountryState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  selectedCountry: null
};

export function countryReducer (state = initialState, action: Action): CountryState {
  switch (action.type) {

    case CountryActions.GET_COUNTRIES:
      return Object.assign({}, state, { loading: true });

    case CountryActions.GET_COUNTRIES_FAIL: {
      return Object.assign({}, state, { loading: false });
    }

    case CountryActions.GET_COUNTRIES_SUCCESS: {
      const countries: Country[] = action.payload.countries;
      if (!countries) return Object.assign({}, state, { loading: false });
      const newCountries: Country[] = countries.filter(country => !state.entities[country.id!]);
      const newCountryIds: string[] = newCountries.map(country => country.id!);
      const newCountryEntities = newCountries.reduce(
        (entities: { [id: string]: Country }, country: Country) => {
          if (country.id)
          return Object.assign(entities, {
            [country.id]: country
          });
        }, {});

      return {
        ids: [...state.ids, ...newCountryIds],
        entities: Object.assign({}, state.entities, newCountryEntities),
        loading: false,
        loaded: true,
        selectedCountry: state.selectedCountry
      };

    }

    default: {
      return state;
    }
  }
}

function _getLoaded() {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.loading);
}

function _getCountry(id: string) {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.entities[id]);
}

function _getCountryEntities() {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.entities);
}

function _getCountries(countryIds: string[]) {
  return (state$: Observable<CountryState>) => state$
    .let(_getCountryEntities())
    .map(entities => countryIds.map(id => entities[id]));
}

function _getCountryIds() {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.ids);
}

function _getSelectedCountry() {
  return (state$: Observable<CountryState>) => state$
    .select(s => s.selectedCountry);
}

function _getCountryState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.country);
}

export function getCountry(id: string) {
  return compose(_getCountry(id), _getCountryState());
}

export function getCountries(countryIds: string[]) {
  return compose(_getCountries(countryIds), _getCountryState());
}

export function getCountryIds() {
  return compose(_getCountryIds(), _getCountryState());
}

export function getCountryEntities() {
  return compose(_getCountryEntities(), _getCountryState());
}

export function getCountryLoaded() {
  return compose(_getLoaded(), _getCountryState());
}

export function getCountryLoading() {
  return compose(_getLoading(), _getCountryState());
}

export function getCountrySelected() {
  return compose(_getSelectedCountry(), _getCountryState());
}

export function getCountryCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCountryIds())
    .switchMap(countryId => state$.let(getCountries(countryId)))
    .map(arr => arr.sort(compareOrder));
}
