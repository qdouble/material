import { Component } from '@angular/core';

@Component({
  selector: 'os-footer',
  template: `
    <footer>
      <div class="footer-content">
        <a [routerLink]="['/terms-and-conditions']">Terms and Conditions</a> |
        <a [routerLink]="['/privacy-policy']">Privacy Policy</a> |
        <a [routerLink]="['/crediting-guidelines']">Crediting Guidelines</a>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        width: 100%;
      }
      a {
        font-size: 11px;
        cursor: pointer;
        color: #547a29;
      }
      .footer-content {
        padding: 20px;
        text-align: center;
      }
      #bottom {
        display: block;
        height: 20px;
      }
    `
  ]
})
export class FooterComponent {}
