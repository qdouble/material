import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-footer',
  directives: [ROUTER_DIRECTIVES],
  template: `

  <a routerLink="terms-and-conditions">Terms and Conditions</a>
  <a routerLink="privacy-policy">Privacy Policy</a>
  <a routerLink="report-spam">Report Spam</a>
  <a routerLink="proof-pic-gallery">Proof Gallery</a>
  <a routerLink="about-us">About Us</a>
  <a routerLink="contact-us">Contact Us</a>

  `
})

export class AppFooter {
  @Input() loggedIn: boolean;
}
