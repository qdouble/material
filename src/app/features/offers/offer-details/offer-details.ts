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
import { Credit } from '../../../models/credit';
import { Offer } from '../../../models/offer';
import { getOffer } from '../../../reducers/offer';
import { OfferActions } from '../../../actions/offer';
import { UserAgent } from '../../../models/user-agent';

import { getCreditTotal, getCreditCollection } from '../../../reducers/user';

import { ConfirmDialog } from '../../../dialogs/confirm.dialog';

@Component({
  selector: 'os-offer-details',
  templateUrl: './offer-details.html',
  styleUrls: ['./offer-details.scss']
})
export class OfferDetailsComponent implements OnDestroy, OnInit {
  alreadyCompleted: boolean;
  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>
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
    this.credits$ = this.store.let(getCreditCollection());
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
          this.credits$
            .takeUntil(this.destroyed$)
            .filter(c => c !== null && c !== undefined)
            .subscribe(credits => {
              if (o) {
                this.alreadyCompleted = !!credits.find(c => c.offerId === o.id);
                if (o.alternateVersions) {
                  o.alternateVersions.forEach(version => {
                    if (credits.find(c => c.offerId === version)) {
                      this.alreadyCompleted = true;
                    }
                  })
                }
              }
            })
        });
    });
    this.creditTotal$ = this.store.let(getCreditTotal());
    this.creditTotal$
      .takeUntil(this.destroyed$)
      .subscribe(total => {
        this.userLevel = Math.floor(Number(Number(total).toFixed(2)));
      });
  }

  continueToOffer(offerId) {
    if (this.alreadyCompleted) {
      return this.openAlreadyCompletedDialog(offerId);
    }
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
        `You are currently at Level ${this.userLevel}. <br>You must reach Level ${this.offer.qualificationLevel} in order to complete this offer.`
      );
    }
    openInNewTab(`offers/offer-redirect?id=${offerId}`);
  }

  openAlreadyCompletedDialog(offerId: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = 'You have already completed this offer. You can only get credit for an offer one time.';
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    this.confirmDialogRef.componentInstance.subtext = `Do you want to continue to this offer's website?`;
    this.confirmDialogRef.componentInstance.subtextColor = `#7DB14A`;
    this.confirmDialogRef.componentInstance.url = `offers/offer-redirect?id=${offerId}`;

    if (this.confirmDialogRef) {
      this.confirmDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  openConfirmDialog(message: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = message;
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogConfig) {
      this.confirmDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
