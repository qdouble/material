import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { UserActions } from '../../actions';
import { AppState } from '../../reducers';

@Component({
  selector: 'offer-redirect',
  template: `
  <header> <h1>Offer Redirect</h1> </header>
  `
})

export class OfferRedirect implements OnInit, OnDestroy {
  id: string;
  routerSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.routerSub = this.route.queryParams
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
