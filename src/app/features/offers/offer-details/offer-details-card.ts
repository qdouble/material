import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Offer } from '../../../models/offer';
import { UserAgent } from '../../../models/user-agent';

import { primaryFlash } from '../../../animations/my-animations';

@Component({
  selector: 'os-offer-details-card',
  templateUrl: './offer-details-card.html',
  styleUrls: ['./offer-details.scss'],
  animations: [
    primaryFlash(350)
  ]
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
    let count = 0;
    setInterval(() => {
      if (count % 2 === 0) {
        this.flash = 'bright';
      } else {
        this.flash = 'dark';
      }
      count++;
    }, 350);
  }

  setLevels() {
    this.currentLevel = Math.floor(Number(Number(this.creditTotal).toFixed(2)));
    this.futureLevel = Math.floor(
      Number(Number(this.creditTotal + this.offer.creditValue).toFixed(2))
    );
  }
}
