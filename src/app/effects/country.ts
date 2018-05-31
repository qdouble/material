/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { CountryService } from '../services/country';
import { CountryActionTypes, GetCountriesFail, GetCountriesSuccess } from '../actions/country';
import { AddNotify } from '../actions/notify';

@Injectable()
export class CountryEffects {
  constructor(public actions$: Actions, private countryService: CountryService) {}

  @Effect()
  getCountries$: Observable<Action> = this.actions$.pipe(
    ofType(CountryActionTypes.GetCountries),
    switchMap(email =>
      this.countryService
        .getCountries()
        .pipe(
          map(res => new GetCountriesSuccess(res)),
          catchError(err => concat(of(new GetCountriesFail(err)), of(new AddNotify(err))))
        )
    )
  );
}
