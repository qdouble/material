/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { CountryService } from '../services/country';
import { CountryActions } from '../actions/country';
import { NotifyActions } from '../actions/notify';

@Injectable()

export class CountryEffects {
  constructor(
    public actions$: Actions,
    private countryActions: CountryActions,
    private countryService: CountryService,
    private notifyActions: NotifyActions,
    private store: Store<AppState>
  ) { }

  @Effect() getCountries$ = this.actions$
    .ofType(CountryActions.GET_COUNTRIES)
    .map(action => <string>action.payload)
    .switchMap(email => this.countryService.getCountries()
      .map((res: any) => this.countryActions.getCountriesSuccess(res))
      .catch((err) => Observable.of(
        this.countryActions.getCountriesFail(err),
        this.notifyActions.addNotify(err)
      ))
    );
}
