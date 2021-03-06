import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as offerActions from '../../../actions/offer';
import { ConfirmDialog } from '../../../dialogs/confirm.dialog';
import { openInNewTab } from '../../../helper/open-in-new-tab';
import { Credit } from '../../../models/credit';
import { Offer } from '../../../models/offer';
import { GetIPInfoResponse } from '../../../models/ui';
import { User } from '../../../models/user';
import { UserAgent } from '../../../models/user-agent';
import * as fromStore from '../../../reducers';
import { getAge } from '../../../utilities/get-age';

@Component({
  selector: 'os-offer-details',
  templateUrl: './offer-details.html',
  styleUrls: ['./offer-details.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class OfferDetailsComponent implements OnDestroy, OnInit {
  ageRestrictUser: boolean;
  alreadyCompleted: boolean;
  confirmDialogRef: MatDialogRef<ConfirmDialog>;
  confirmDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  credits$: Observable<Credit[]>;
  creditTotal$: Observable<number>;
  destroyed$: Subject<any> = new Subject<any>();
  id: string;
  invalidCountry$: Observable<boolean>;
  ipInfo$: Observable<GetIPInfoResponse>;
  userAgent: UserAgent;
  userAgent$: Observable<UserAgent>;
  userLevel: number;
  publish = PUBLISH;
  offer$: Observable<Offer>;
  offer: Offer;
  user$: Observable<User>;
  userAge: number;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.credits$ = this.store.pipe(select(fromStore.getUserCreditCollection));
    this.route.params.forEach(param => {
      let id = param['id'];
      this.store.dispatch(new offerActions.GetOffer(id));
      this.userAgent$ = this.store.select(s => s.offer.userAgent);
      this.userAgent$.pipe(takeUntil(this.destroyed$)).subscribe(u => (this.userAgent = u));
      this.user$ = this.store.pipe(select(fromStore.getUserProfile));
      this.offer$ = this.store.pipe(select(fromStore.getSelectedOffer));
      this.offer$.pipe(takeUntil(this.destroyed$)).subscribe(o => {
        this.offer = o;
        this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
          if (user && user.holdReason === 'Identification Hold - Suspicious Activity') {
            this.router.navigate(['..']);
          }
          this.userAge = getAge(user.birthday);
          if (o && o.ageRestrict && o.minUserAge && o.minUserAge > this.userAge) {
            this.ageRestrictUser = true;
          } else {
            this.ageRestrictUser = false;
          }
        });
        this.credits$
          .pipe(
            takeUntil(this.destroyed$),
            filter(c => c !== null && c !== undefined)
          )
          .subscribe(credits => {
            if (o) {
              this.alreadyCompleted = !!credits.find(c => c.offerId === o.id);
              if (o.alternateVersions) {
                o.alternateVersions.forEach(version => {
                  if (credits.find(c => c.offerId === version)) {
                    this.alreadyCompleted = true;
                  }
                });
              }
            }
          });
      });
    });
    this.creditTotal$ = this.store.pipe(select(fromStore.getUserCreditTotal));
    this.creditTotal$.pipe(takeUntil(this.destroyed$)).subscribe(total => {
      this.userLevel = Math.floor(Number(Number(total).toFixed(2)));
    });
    this.ipInfo$ = this.store.pipe(select(fromStore.getUIIPInfo));
    this.invalidCountry$ = this.store.pipe(select(fromStore.getUIInvalidCountry));
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
    if (
      this.userAgent &&
      this.offer.restrictDevices &&
      this.offer.android &&
      !this.userAgent.isAndroid
    ) {
      return this.openConfirmDialog('This offer is restricted to Android devices.');
    }
    if (
      this.userAgent &&
      this.offer.restrictDevices &&
      this.offer.mobile &&
      !this.userAgent.isMobile
    ) {
      return this.openConfirmDialog('This offer is restricted to mobile devices.');
    }
    if (
      this.userAgent &&
      this.offer.restrictDevices &&
      this.offer.desktop &&
      !this.userAgent.isDesktop
    ) {
      return this.openConfirmDialog('This offer is restricted to desktop and laptop devices.');
    }
    if (
      this.userAgent &&
      this.offer.restrictDevices &&
      this.offer.windows &&
      !this.userAgent.isWindows
    ) {
      return this.openConfirmDialog(
        'This offer is restricted to devices that are running Windows.'
      );
    }
    if (this.userAgent && this.offer.restrictDevices && this.offer.mac && !this.userAgent.isMac) {
      return this.openConfirmDialog('This offer is restricted to Mac computers.');
    }
    if (this.offer.hideToUnQualifiedUsers && this.offer.qualificationLevel > this.userLevel) {
      return this.openConfirmDialog(
        `You are currently at Level ${this.userLevel}.<br>
        You must reach Level ${this.offer.qualificationLevel} in order to complete this offer.`
      );
    }
    openInNewTab(`offers/offer-redirect?id=${offerId}`);
  }

  openAlreadyCompletedDialog(offerId: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText =
      'You have already completed this offer. You can only get credit for an offer one time.';
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    // tslint:disable-next-line:max-line-length
    this.confirmDialogRef.componentInstance.subtext = `Do you want to continue to this offer's website?`;
    this.confirmDialogRef.componentInstance.subtextColor = `#7DB14A`;
    this.confirmDialogRef.componentInstance.url = `offers/offer-redirect?id=${offerId}`;

    if (this.confirmDialogRef) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  openConfirmDialog(message: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog, this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = message;
    this.confirmDialogRef.componentInstance.confirmColor = '#FD9F28';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogConfig) {
      this.confirmDialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
