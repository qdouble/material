import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryActionTypes, GetCountriesFail, GetCountriesSuccess } from '../actions/country';
import { AddNotify } from '../actions/notify';
import { CountryService } from '../services/country';

@Injectable()
export class CountryEffects {
  constructor(public actions$: Actions, private countryService: CountryService) {}

  @Effect()
  getCountries$: Observable<Action> = this.actions$.pipe(
    ofType(CountryActionTypes.GetCountries),
    switchMap(() =>
      this.countryService.getCountries().pipe(
        map(res => new GetCountriesSuccess(res)),
        catchError(err => concat(of(new GetCountriesFail(err)), of(new AddNotify(err))))
      )
    )
  );
}
