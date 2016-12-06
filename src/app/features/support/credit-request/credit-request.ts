import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppState } from '../../../reducers';
import { CreditRequestActions } from '../../../actions/credit-request';
import {
  getCreditRequest, getOfferClickCollection, getOfferClicksLoaded
} from '../../../reducers/credit-request';
import { CreditRequest, OfferClick } from '../../../models/credit-request';

@Component({
  selector: 'os-credit-request',
  templateUrl: './credit-request.html',
  styleUrls: ['./credit-request.css']
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
  view: boolean;
  constructor(
    private creditRequestActions: CreditRequestActions,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    route.params.forEach(param => {
      let id = param['id'];
      if (id) {
        this.view = true;
        this.store.dispatch(this.creditRequestActions.getCreditRequest(id));
        this.creditRequest$ = this.store.let(getCreditRequest(id));
      } else {
        store.dispatch(creditRequestActions.getOfferClicks());
      }
    });
    this.f = fb.group({
      offerId: ['', Validators.minLength(2)],
      offerName: '',
      completedOn: '2016-11-27',
      headers: ['', [Validators.required, Validators.maxLength(10000)]],
      body: ['', [Validators.required, Validators.maxLength(10000)]],
      additionalDetails: ['', Validators.maxLength(10000)]
    });
    if (this.creditRequest$) {
      this.creditRequest$
        .takeUntil(this.destroyed$)
        .filter(c => c != undefined) // tslint:disable-line:triple-equals
        .subscribe(creditRequest => {
          this.creditRequest = creditRequest;
          this.f.patchValue({
            headers: creditRequest.headers,
            body: creditRequest.body
          });
        });
    }

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
  ngOnInit() {
    this.f.valueChanges
      .takeUntil(this.destroyed$)
      .subscribe((f: CreditRequest) => {
        if (this.view && f.headers === this.creditRequest.headers &&
          f.body === this.creditRequest.body &&
          f.additionalDetails === this.creditRequest.additionalDetails) {
            this.disableButton = true;
        } else if (this.view) {
          this.disableButton = false;
        }
      });
  }
  addRequest(request: CreditRequest) {
    this.store.dispatch(this.creditRequestActions.addCreditRequest(Object.assign({}, request, {
      offerName: this.offerNames[this.offerIds.indexOf(request.offerId)]
    })));
  }
  editRequest(request: CreditRequest) {
    this.store.dispatch(this.creditRequestActions.editCreditRequest(Object.assign({}, request, {
      id: this.creditRequest.id
    })));
  }

  submitRequest(request) {
    this.view ? this.editRequest(request) : this.addRequest(request);
  }
  goBack(event) {
    this.store.dispatch(back());
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
