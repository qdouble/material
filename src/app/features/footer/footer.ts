import { Component } from '@angular/core';

@Component({
  selector: 'os-footer',
  template: `
  <mat-card-footer>
    <div class="footer-content">
    </div>
    <a [routerLink]="['/terms-and-conditions']">Terms and Conditions</a> |
    <a [routerLink]="['/privacy-policy']">Privacy Policy</a> |
    <a [routerLink]="['/crediting-guidelines']">Crediting Guidelines</a>
  </mat-card-footer>
  `,
  styles: [
    `
      mat-card-footer {
        text-align: center;
      }
      a {
        font-size: 11px;
        cursor: pointer;
        color: #547a29;
      }
      .footer-content {
        padding-top: 15px;
      }
    `
  ]
})
export class FooterComponent {}
