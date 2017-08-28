import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
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

import { getCreditTotal } from '../../../reducers/user';

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
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  id: string;
  userAgent: UserAgent;
  userAgent$: Observable<UserAgent>;
  userLevel: number;
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
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
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
    this.creditTotal$ = this.store.let(getCreditTotal());
    this.creditTotal$.subscribe(total => {
      this.userLevel = Math.floor(total);
    });
  }

  continueToOffer(offerId) {
    if (this.userAgent && this.offer.restrictDevices && this.offer.IOS && !this.userAgent.isIOS) {
      return this.openConfirmDialog(
        'This offer is restricted to IOS devices <br> (iPhone, iPad or iPod).'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.android && !this.userAgent.isAndroid) {
      return this.openConfirmDialog(
        'This offer is restricted to Android devices.'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.mobile && !this.userAgent.isMobile) {
      return this.openConfirmDialog(
        'This offer is restricted to mobile devices.'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.desktop && !this.userAgent.isDesktop) {
      return this.openConfirmDialog(
        'This offer is restricted to desktop and laptop devices.'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.windows && !this.userAgent.isWindows) {
      return this.openConfirmDialog(
        'This offer is restricted to devices that are running Windows.'
      );
    }
    if (this.userAgent && this.offer.restrictDevices
      && this.offer.mac && !this.userAgent.isMac) {
      return this.openConfirmDialog(
        'This offer is restricted to Mac computers.'
      );
    }
    if (this.offer.hideToUnQualifiedUsers && this.offer.qualificationLevel > this.userLevel) {
      return this.openConfirmDialog(
        `You must reach level ${this.offer.qualificationLevel} in order to complete this offer.`
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
