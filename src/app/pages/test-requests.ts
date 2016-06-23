import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getTestRequestAllUsers } from '../reducers';
import { TestRequestActions } from '../actions';

@Component({
  selector: 'child-cmp',
  template: `
  
  <h1>Hello from child</h1>
  User: {{user}}

  `
})

export class ChildCmp {
  @Input() user
}

@Component({
  selector: 'test-requests',
  directives: [REACTIVE_FORM_DIRECTIVES, ChildCmp],
  template: `
  
  <header>
  <h1>Test Requests</h1>
  </header>
  
  <button (click)="onSubmit()">Show All Users</button>
  <button (click)="checkLoginStatus()">Check Login Status</button>
  <pre>
  {{users$ | async | json }}
  {{user$ | async }}
  </pre>
  <child-cmp [user]="user$ | async"></child-cmp>

  `
})

export class TestRequests {
  users$: Observable<any>;


  constructor(
    private store: Store<AppState>,
    private testActions: TestRequestActions
  ) {
    this.users$ = store.let(getTestRequestAllUsers())
    // this.users$.subscribe(data => {
    //   console.log(data);
    // })
  }

  ngOnInit() {
    // this.users$ = store.let(getTestRequestAllUsers())
    this.users$.subscribe(data => {
      console.log(data);
    })
  }

  checkLoginStatus(){
    this.store.dispatch(this.testActions.checkLoginStatus());
  }

  onSubmit() {
    this.store.dispatch(this.testActions.showAllUsers());
  }

}