import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MdDialog, MdDialogRef, MdDialogConfig,
  MdSnackBar, MdSnackBarConfig
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { openInNewTab } from '../../../helper/open-in-new-tab';

import { AppState } from '../../../reducers';
import { Offer } from '../../../models/offer';
import { getOffer } from '../../../reducers/offer';
import { OfferActions } from '../../../actions/offer';
import { UserAgent } from '../../../models/user-agent';

import { ConfirmDialog } from '../../../dialogs/confirm.dialog';

@Component({
  selector: 'os-offer-details',
  templateUrl: './offer-details.html',
  styleUrls: ['./offer-details.scss']
})
export class OfferDetailsComponent implements OnDestroy, OnInit {
  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  destroyed$: Subject<any> = new Subject<any>();
  id: string;
  userAgent: UserAgent;
  userAgent$: Observable<UserAgent>;
  publish = PUBLISH;
  offer$: Observable<Offer>;
  offer: Offer;

  constructor(
    public dialog: MdDialog,
    private offerActions: OfferActions,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    (typeof document !== 'undefined') ? (document.getElementById('important-review').scrollIntoView()) : {};  // tslint:disable-line
    this.route.params.forEach(param => {
      let id = param['id'];
      this.store.dispatch(this.offerActions.getOffer(id));
      this.userAgent$ = this.store.select(s => s.offer.userAgent);
      this.userAgent$.takeUntil(this.destroyed$).subscribe(u => this.userAgent = u);
      this.offer$ = this.store.let(getOffer(id));
      this.offer$
        .takeUntil(this.destroyed$)
        .subscribe(o => {
          this.offer = o;
        });
    });
  }

  continueToOffer(offerId) {
    if (this.userAgent && this.offer.restrictDevices && this.offer.IOS && !this.userAgent.isIOS) {
      return this.openConfirmDialog(
        'This offer is restricted to IOS Devices <br> (iPhone, iPad or iPod).'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.android && !this.userAgent.isAndroid) {
      return this.openConfirmDialog(
        'This offer is restricted to Android devices.'
      );
    }
    openInNewTab(`offers/offer-redirect?id=${offerId}`);
  }

  openConfirmDialog(message: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = message;
    this.confirmDialogRef.componentInstance.confirmColor = '#d47411';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    this.confirmDialogRef.afterClosed()
      .takeUntil(this.destroyed$)
      .subscribe(result => {
        this.confirmDialogRef = null;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
