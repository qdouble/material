import { Component } from '@angular/core';

@Component({
  selector: 'os-footer',
  template: `
  <md-card-footer>
    <a [routerLink]="['/terms-and-conditions']">Terms and Conditions</a> |
    <a [routerLink]="['/privacy-policy']">Privacy Policy</a>
  </md-card-footer>
  `,
  styles: [`md-card-footer {text-align: center}
  a{font-size: 11px; cursor: pointer; color: #547a29}`]
})

export class FooterComponent {}
