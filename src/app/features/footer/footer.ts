import { Component } from '@angular/core';

@Component({
  selector: 'os-footer',
  template: `
  <mat-card-footer>
    <a [routerLink]="['/terms-and-conditions']">Terms and Conditions</a> |
    <a [routerLink]="['/privacy-policy']">Privacy Policy</a> |
    <a [routerLink]="['/crediting-guidelines']">Crediting Guidelines</a>
  </mat-card-footer>
  `,
  styles: [
    `mat-card-footer {text-align: center}
  a{font-size: 11px; cursor: pointer; color: #547a29}`
  ]
})
export class FooterComponent {}
