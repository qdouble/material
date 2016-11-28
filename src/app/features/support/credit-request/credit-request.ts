import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../../reducers';
import { CreditRequestActions } from '../../../actions/credit-request';
import { getOfferClickCollection, getOfferClicksLoaded } from '../../../reducers/credit-request';
import { CreditRequest, OfferClick } from '../../../models/credit-request';

@Component({
  selector: 'os-credit-request',
  templateUrl: './credit-request.html',
  styleUrls: ['./credit-request.css']
})

export class CreditRequestComponent implements OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  loadedClicks$: Observable<boolean>;
  offerClicks$: Observable<OfferClick[]>;
  offerIds: string[];
  offerIds$: Observable<string[]>;
  offerNames: string[];
  offerNames$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private creditRequestActions: CreditRequestActions
  ) {
    this.f = fb.group({
      offerId: ['', Validators.minLength(2)],
      offerName: '',
      completedOn: '2016-11-27',
      confirmationEmail: ['', [Validators.required, Validators.maxLength(10000)]],
      additionalDetails: ['', Validators.maxLength(10000)]
    });
    store.dispatch(creditRequestActions.getOfferClicks());
    this.offerClicks$ = store.let(getOfferClickCollection());
    this.offerIds$ = this.offerClicks$.map(clicks => clicks.map(click => click.id));
    this.offerIds$
      .takeUntil(this.destroyed$)
      .subscribe(ids => this.offerIds = ids);
    this.offerNames$ = this.offerClicks$.map(clicks => clicks.map(click => click.name));
    this.offerNames$
      .takeUntil(this.destroyed$)
      .subscribe(names => this.offerNames = names);
    this.loadedClicks$ = store.let(getOfferClicksLoaded());
  }
  addRequest(request: CreditRequest) {
    this.store.dispatch(this.creditRequestActions.addCreditRequest(Object.assign({}, request, {
      offerName: this.offerNames[this.offerIds.indexOf(request.offerId)]
    })));
  }
  goBack(event) {
    this.store.dispatch(back());
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
