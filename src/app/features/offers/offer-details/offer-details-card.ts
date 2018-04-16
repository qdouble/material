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
  @Input() ageRestrictUser: boolean;
  @Input() alreadyCompleted: boolean;
  @Input() creditTotal: number;
  @Input() publish: boolean;
  @Input() offer: Offer;
  @Input() userAge: number;
  @Input() userAgent: UserAgent;
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
