import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PrizeActions, UserActions } from '../../actions';
import { Prize } from '../../models';
import {
  AppState, getPrizeCollection, getPrizeLoading,
  getPrizeLoaded
} from '../../reducers';
import { RegexValues } from '../../validators';

@Component({
  selector: 'home',
  template: require('./home.html')
})

export class Homepage implements OnDestroy {
  prizes$: Observable<Prize>;
  prizesLoading$: Observable<boolean>;
  prizesLoaded$: Observable<boolean>;
  prizesLoadedSub: Subscription;
  f = new FormGroup({
    email: new FormControl('unregiseterd@gmail.com',
      [Validators.required, Validators.pattern(RegexValues.email)])
  });
  prizeForm = new FormGroup({});

  constructor(
    private prizeActions: PrizeActions,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions
  ) {
    this.prizes$ = this.store.let(getPrizeCollection());
    this.prizesLoaded$ = this.store.let(getPrizeLoaded());
    this.prizesLoadedSub = this.prizesLoaded$.subscribe(val => {
      if (!val) this.store.dispatch(this.prizeActions.getPrizes());
    });
  }

  submitForm() {
    this.store.dispatch(this.userActions.checkEmail(this.f.get('email').value));
    this.store.dispatch(this.prizeActions.selectPrize(this.prizeForm.value.selectedPrize));
  }

  ngOnDestroy() {
    this.prizesLoadedSub.unsubscribe();
  }
}
