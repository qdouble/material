import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getTestRequestAllUsers, getTestRequestGetAffiliates } from '../reducers';
import { TestRequestActions } from '../actions';


@Component({
  selector: 'test-requests',
  template: `

  <header>
  <h1>Test Requests</h1>
  </header>
  
  <button (click)="submitForm()">Show All Users</button>
  <button (click)="checkLoginStatus()">Check Login Status</button>
  <button (click)="getAffiliates()">Get Affiliates</button>
 <button routerLink="">Go Profile from RouterLink</button>
  <pre>
  {{users$ | async | json }}
  {{affiliates$ | async | json }}
  </pre>

  `
})

export class TestRequests {
  users$: Observable<any>;
  affiliates$: Observable<any>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private testActions: TestRequestActions
  ) {
    this.users$ = store.let(getTestRequestAllUsers());
    this.affiliates$ = store.let(getTestRequestGetAffiliates());
    this.activatedRoute.data.subscribe(data => {
      console.log(data);
    });
  }

  checkLoginStatus() {
    this.store.dispatch(this.testActions.checkLoginStatus());
  }

  getAffiliates() {
    this.store.dispatch(this.testActions.getAffiliates());
  }

  submitForm() {
    this.store.dispatch(this.testActions.showAllUsers());
  }

}
