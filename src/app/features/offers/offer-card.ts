import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-offer-card',
  templateUrl: './offer-card.html',
  styleUrls: ['./offer-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferCard {
  @Input() hideLevel: boolean;
  @Input() loggedIn: boolean;
  @Input() mobile: boolean;
  @Input() showingAvailable: boolean;
  @Input() sideNavOpen: boolean;
  @Input() offerId: string;
  @Input() creditTotal: number;
}
