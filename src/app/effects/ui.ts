/* tslint:disable: member-ordering */
import { Injectable, Injector } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UIActions } from '../actions/ui';
import { AppState } from '../reducers';
import { UIService } from '../services/ui';
import { NotifyActions } from '../actions/notify';

@Injectable()

export class UIEffects {
  constructor(
    public actions$: Actions,
    private injector: Injector,
    private notifyActions: NotifyActions,
    private store: Store<AppState>,
    private uiActions: UIActions,
    private uiService: UIService
  ) { }

  @Effect() getProfile$ = this.actions$
    .ofType(UIActions.GET_VERSION)
    .map(action => <string>action.payload)
    .switchMap(() => this.uiService.getVersion()
      .map((res: any) => this.uiActions.getVersionSuccess(res))
      .catch((err) => Observable.of(
        this.uiActions.getVersionFail(err)
      ))
    );
}
