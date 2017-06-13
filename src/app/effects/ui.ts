/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { UIActions } from '../actions/ui';
import { UIService } from '../services/ui';
import { NotifyActions } from '../actions/notify';

@Injectable()

export class UIEffects {
  constructor(
    public actions$: Actions,
    private notifyActions: NotifyActions,
    private uiActions: UIActions,
    private uiService: UIService
  ) { }

   @Effect() addUserIDToSocket$ = this.actions$
    .ofType(UIActions.ADD_USER_ID_TO_SOCKET)
    .map(action => <string>action.payload)
    .switchMap((id) => this.uiService.addUserIDToSocket(id)
      .mergeMap((res: any) => Observable.of(
        this.uiActions.addUserIDToSocketSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .catch((err) => Observable.of(
        this.uiActions.addUserIDToSocketFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

  @Effect() contactUs$ = this.actions$
    .ofType(UIActions.CONTACT_US)
    .map(action => <{ email: string, subject: string, question: string }>action.payload)
    .switchMap((contact) => this.uiService.contactUs(contact)
      .mergeMap((res: any) => Observable.of(
        this.uiActions.contactUsSuccess(res),
        this.notifyActions.addNotify(res)
      ))
      .catch((err) => Observable.of(
        this.uiActions.contactUsFail(err),
        this.notifyActions.addNotify(err)
      ))
    );

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
