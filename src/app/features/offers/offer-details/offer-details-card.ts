import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Offer } from '../../../models/offer';
import { UserAgent } from '../../../models/user-agent';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferDetailsCard implements OnInit {
  accept: boolean;
  agree: boolean;
  currentLevel: number;
  futureLevel: number;
  @Input() creditTotal: number;
  @Input() offer: Offer;
  @Input() userAgent: UserAgent;
  @Input() publish: boolean;
  @Output() continueToOffer = new EventEmitter();
  ngOnInit() {
    this.currentLevel = Math.floor(Number(Number(this.creditTotal).toFixed(2)));
    this.futureLevel = Math.floor(Number(Number(this.creditTotal + this.offer.creditValue).toFixed(2)))
  }
}
