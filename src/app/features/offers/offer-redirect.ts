import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { UserActions } from '../../actions/user';
import { AppState } from '../../reducers';

@Component({
  selector: 'offer-redirect',
  template: `
  <md-card class="os-page-container">
  <div class="progress-container">
    <h5>Redirecting to offer</h5>
    <md-progress-bar mode="query" class="demo-progress-bar-margins"></md-progress-bar>
  </div>
  </md-card>
  `, styles: [`
  h5 { text-align: center } md-progress-bar { width: 75%; margin: 0 auto; }
  .progress-container { position: absolute; top: 40%; transform: translateY(-40%); width: 100%; }
  `]
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
