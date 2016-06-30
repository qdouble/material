import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getTestRequestAllUsers, getTestRequestGetAffiliates } from '../reducers';
import { TestRequestActions } from '../actions';

@Component({
  selector: 'child-cmp',
  template: `
  
  <h1>Hello from child</h1>
  User: {{user}}

  `
})

export class ChildCmp {
  @Input() user;
}

@Component({
  selector: 'test-requests',
  directives: [REACTIVE_FORM_DIRECTIVES, ChildCmp, ROUTER_DIRECTIVES],
  template: `

  <header>
  <h1>Test Requests</h1>
  </header>
  
  <button (click)="onSubmit()">Show All Users</button>
  <button (click)="checkLoginStatus()">Check Login Status</button>
  <button (click)="getAffiliates()">Get Affiliates</button>
 <button routerLink="">Go Profile from RouterLink</button>
  <pre>
  {{users$ | async | json }}
  {{affiliates$ | async | json }}
  </pre>
  // <child-cmp [user]="user$ | async"></child-cmp>

  `
})

export class TestRequests {
  users$: Observable<any>;
  affiliates$: Observable<any>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
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

  onSubmit() {
    this.store.dispatch(this.testActions.showAllUsers());
  }

}
