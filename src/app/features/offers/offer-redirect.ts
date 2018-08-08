import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import * as userActions from '../../actions/user';
import { AppState } from '../../reducers';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'offer-redirect',
  template: `
  <mat-card class="os-page-container">
  <div class="progress-container">
    <h5>Redirecting to advertiser's website...</h5>
    <mat-progress-bar mode="query" class="demo-progress-bar-margins"></mat-progress-bar>
  </div>
  </mat-card>
  `,
  styles: [
    `
  h5 { text-align: center } mat-progress-bar { width: 75%; margin: 0 auto; }
  .progress-container { position: absolute; top: 40%; transform: translateY(-40%); width: 100%; }
  `
  ]
})
export class OfferRedirect implements OnInit, OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  id: string;
  routerSub: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.routerSub = this.route.queryParams
      .pipe(takeUntil(this.destroyed$), filter(query => query !== undefined))
      .subscribe(query => {
        this.id = query['id'];
      });
  }
  ngOnInit() {
    this.store.dispatch(new userActions.RecordClick(this.id));
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
