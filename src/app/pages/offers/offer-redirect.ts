import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { OfferActions, UserActions } from '../../actions';
import { AppState } from '../../reducers';

@Component({
  selector: 'offer-redirect',
  directives: [],
  template: `
  <header> <h1>Offer Redirect</h1> </header>
  `
})

export class OfferRedirect implements OnInit, OnDestroy {
  id: string;
  routerSub: Subscription;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.routerSub = this.router.routerState.queryParams
    .filter(query => query !== undefined)
    .subscribe(query => {
      this.id = query['id'];
    });
  }
  ngOnInit() {
    this.store.dispatch(this.userActions.recordClick(this.id));
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
