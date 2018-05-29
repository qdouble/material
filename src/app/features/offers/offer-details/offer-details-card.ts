import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
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
  current: { availableCountryCodes: string[]; invalidCountry: boolean; ipCountryCode: string };
  currentLevel: number;
  flash: string;
  futureLevel: number;
  notAvailableInCountry: boolean;
  showInvalidCountry: boolean;
  @Input() ageRestrictUser: boolean;
  @Input() alreadyCompleted: boolean;
  @Input() creditTotal: number;
  @Input() invalidCountry: boolean;
  @Input() ipCountryCode: string;
  @Input() publish: boolean;
  @Input() offer: Offer;
  @Input() userAge: number;
  @Input() userAgent: UserAgent;
  @Output() continueToOffer = new EventEmitter();
  constructor() {
    this.current = Object.assign({});
  }
  ngOnChanges(changes: SimpleChanges) {
    this.setLevels();
    if (changes.offer && changes.offer.currentValue)
      this.current.availableCountryCodes = changes.offer.currentValue.availableCountryCodes;
    if (changes.invalidCountry) this.current.invalidCountry = changes.invalidCountry.currentValue;
    if (changes.ipCountryCode) this.current.ipCountryCode = changes.ipCountryCode.currentValue;
    if (
      this.current.invalidCountry ||
      (this.current.ipCountryCode &&
        this.current.availableCountryCodes &&
        !this.current.availableCountryCodes.includes(this.ipCountryCode))
    ) {
      this.showInvalidCountry = true;
    }
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
