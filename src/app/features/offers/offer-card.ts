import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { Offer } from '../../models/offer';

@Component({
  selector: 'os-offer-card',
  templateUrl: './offer-card.html',
  styleUrls: ['./offer-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCard implements OnInit {
  isNew: boolean;
  @Input() addUp: boolean;
  @Input() creditedOfferIds: string[];
  @Input() creditValue: number;
  @Input() hideLevel: boolean;
  @Input() loggedIn: boolean;
  @Input() mobile: boolean;
  @Input() showingAvailable: boolean;
  @Input() hideToUnqualified: boolean;
  @Input() sideNavOpen: boolean;
  @Input() offerId: string;
  @Input() offer: Offer;
  @Input() creditTotal: number;
  @Input() qualificationLevel: number;
  @Output() checkOffer = new EventEmitter();
  @Output() goToOfferDetails = new EventEmitter();
  ngOnInit() {
    const dateNow = new Date();
    if (this.offer) {
      const createdDate = new Date(this.offer.createdAt);
      this.isNew = dateNow.getTime() - createdDate.getTime() < 604800000 * 2;
    }
  }
}
