import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { Offer } from '../../../models/offer';
import { UserAgent } from '../../../models/user-agent';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.scss']
})

export class OfferDetailsCard implements OnChanges, OnInit {
  accept: boolean;
  agree: boolean;
  currentLevel: number;
  flash: string;
  futureLevel: number;
  @Input() alreadyCompleted: boolean;
  @Input() creditTotal: number;
  @Input() offer: Offer;
  @Input() userAgent: UserAgent;
  @Input() publish: boolean;
  @Output() continueToOffer = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    this.setLevels();
  }
  ngOnInit() {
    this.setLevels();
  }

  setLevels() {
    this.currentLevel = Math.floor(Number(Number(this.creditTotal).toFixed(2)));
    this.futureLevel = Math.floor(
      Number(Number(this.creditTotal + this.offer.creditValue).toFixed(2))
    );
  }
}
