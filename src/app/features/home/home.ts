import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromStore from '../../reducers';
import * as prizeActions from '../../actions/prize';
import * as userActions from '../../actions/user';
import { Prize } from '../../models/prize';
import { RegexValues } from '../../validators';

@Component({
  selector: 'os-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class Homepage implements OnDestroy {
  prizes$: Observable<Prize[]>;
  prizesLoading$: Observable<boolean>;
  prizesLoaded$: Observable<boolean>;
  prizesLoadedSub: Subscription;
  f = new FormGroup({
    email: new FormControl( PUBLISH ? '' : 'unregiseterd@gmail.com',
      [Validators.required, Validators.pattern(RegexValues.email)])
  });
  prizeForm = new FormGroup({});

  constructor(
    private store: Store<fromStore.AppState>
  ) {
    this.prizes$ = this.store.pipe(select(fromStore.getPrizeCollection));
    this.prizesLoaded$ = this.store.pipe(select(fromStore.getPrizeLoaded));
    this.prizesLoadedSub = this.prizesLoaded$.subscribe(val => {
      if (!val) this.store.dispatch(new prizeActions.GetPrizes());
    });
  }

  submitForm() {
    this.store.dispatch(new userActions.CheckEmail(this.f.get('email').value));
    this.store.dispatch(new prizeActions.SelectPrize(this.prizeForm.value.selectedPrize));
  }

  ngOnDestroy() {
    this.prizesLoadedSub.unsubscribe();
  }
}
