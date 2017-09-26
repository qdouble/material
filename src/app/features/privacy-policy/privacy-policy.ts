import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'os-privacy-policy',
  templateUrl: './privacy-policy.html',
  styles: [`.container { max-width: 1000px; margin: 0 auto;}`],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class PrivacyPolicy { }
