import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { todaysDate } from '../../../helper/todays-date';

import * as fromStore from '../../../reducers';
import * as creditRequestActions from '../credit-request.actions';
import * as offerActions from '../../../actions/offer';
import { CreditRequest, OfferClick } from '../credit-request.model';
import { Offer } from '../../../models/offer';
import { Back } from '../../../actions/router';

@Component({
  selector: 'os-credit-request',
  templateUrl: './credit-request.html',
  styleUrls: ['./credit-request.scss']
})
export class CreditRequestComponent implements OnDestroy, OnInit {
  disableButton: boolean;
  creditRequest: CreditRequest;
  creditRequest$: Observable<CreditRequest>;
  destroyed$: Subject<any> = new Subject<any>();
  f: FormGroup;
  loadedClicks$: Observable<boolean>;
  offerClicks$: Observable<OfferClick[]>;
  offerIds: string[];
  offerIds$: Observable<string[]>;
  offerNames: string[];
  offerNames$: Observable<string[]>;
  todaysDate = todaysDate;
  offer$: Observable<Offer>;
  view: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<fromStore.AppState>
  ) {
    this.route.params.forEach(param => {
      let id = param['id'];
      if (id) {
        this.view = true;
        this.store.dispatch(new creditRequestActions.GetCreditRequest(id));
        this.creditRequest$ = this.store.pipe(select(fromStore.getSelectedCreditRequest));
      } else {
        store.dispatch(new creditRequestActions.GetOfferClicks());
      }
    });
    this.f = this.fb.group({
      offerId: ['', [Validators.minLength(2), Validators.required]],
      offerName: '',
      completedOn: ['', Validators.required],
      headers: ['', [Validators.required, Validators.maxLength(200000)]],
      body: ['', [Validators.required, Validators.maxLength(200000)]],
      additionalDetails: ['', Validators.maxLength(200000)]
    });
    if (this.creditRequest$) {
      this.creditRequest$
        .takeUntil(this.destroyed$)
        .filter(c => c != undefined) // tslint:disable-line:triple-equals
        .subscribe(creditRequest => {
          this.creditRequest = creditRequest;
          this.f.patchValue({
            headers: creditRequest.headers,
            body: creditRequest.body,
            completedOn: creditRequest.completedOn
          });
        });
    }

    this.offerClicks$ = store.pipe(select(fromStore.getOfferClickCollection));
    this.offerIds$ = this.offerClicks$.map(clicks => clicks.map(click => click.id));
    this.offerIds$.takeUntil(this.destroyed$).subscribe(ids => (this.offerIds = ids));
    this.offerNames$ = this.offerClicks$.map(clicks => clicks.map(click => click.name));
    this.offerNames$.takeUntil(this.destroyed$).subscribe(names => (this.offerNames = names));
    this.loadedClicks$ = store.pipe(select(fromStore.getOfferClicksLoaded));
  }
  ngOnInit() {
    this.f.valueChanges.takeUntil(this.destroyed$).subscribe((f: CreditRequest) => {
      if (
        this.view &&
        f.headers === this.creditRequest.headers &&
        f.body === this.creditRequest.body &&
        f.additionalDetails === this.creditRequest.additionalDetails
      ) {
        this.disableButton = true;
      } else if (this.view) {
        this.disableButton = false;
      }
    });
    this.f
      .get('offerId')
      .valueChanges.takeUntil(this.destroyed$)
      .subscribe(id => {
        this.store.dispatch(new offerActions.GetOffer(id));
        this.offer$ = this.store.pipe(select(fromStore.getSelectedOffer));
      });
  }
  addRequest(request: CreditRequest) {
    this.store.dispatch(
      new creditRequestActions.AddCreditRequest(
        Object.assign({}, request, {
          offerName: this.offerNames[this.offerIds.indexOf(request.offerId)]
        })
      )
    );
  }
  editRequest(request: CreditRequest) {
    this.store.dispatch(
      new creditRequestActions.EditCreditRequest(
        Object.assign({}, request, {
          id: this.creditRequest.id
        })
      )
    );
  }

  submitRequest(request) {
    this.view ? this.editRequest(request) : this.addRequest(request);
  }
  goBack(event) {
    this.store.dispatch(new Back());
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
