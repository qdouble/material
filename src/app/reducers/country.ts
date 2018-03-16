/* tslint:disable: no-switch-case-fall-through */
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { CountryActions, CountryActionTypes } from '../actions/country';
import { Country } from '../models/country';

import { compareOrder } from '../helper/compare-order';

export const adapter = createEntityAdapter<Country>({
  selectId: (country: Country) => country.id,
  sortComparer: compareOrder
});


export interface State extends EntityState<Country> {
  loading: boolean;
  loaded: boolean;
  selectedCountry: string | null;
}

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedCountry: null
});

export function countryReducer(state = initialState, action: CountryActions): State {
  switch (action.type) {

    case CountryActionTypes.GetCountries:
      return { ...state, loading: true };

    case CountryActionTypes.GetCountriesFail: {
      return { ...state, loading: false };
    }

    case CountryActionTypes.GetCountriesSuccess: {
      const countries = action.payload.countries;
      if (!countries) return { ...state, loading: false };
      return {
        ...adapter.addAll(countries, state),
        loading: false,
        loaded: true,
        selectedCountry: state.selectedCountry
      };
    }

    case CountryActionTypes.Select: {
      return {
        ...state,
        selectedCountry: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getSelectedCountry = (state: State) => state.selectedCountry;
