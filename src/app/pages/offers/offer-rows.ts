import { Component, Input } from '@angular/core';
import { Offer } from '../../models';
@Component({
  selector: 'offer-row',
  directives: [],
  template: `

  `
})

export class OfferRows {
  @Input() offers: Offer[];
}
