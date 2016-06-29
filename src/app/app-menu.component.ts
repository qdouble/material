import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-menu',
  directives: [ROUTER_DIRECTIVES],
  template: `

  <span *ngIf="!loggedIn">
    <a routerLink="">Home</a>
    <a routerLink="login">Login</a>
    <a routerLink="register">Register</a>
    <a routerLink="view-offers">View Offers</a>
    <a routerLink="how-it-works">How It Works</a>
    <a routerLink="faq">FAQ</a>
    <a routerLink="proof-pic-gallery">Proof Pic Gallery</a>
  </span>
  <span *ngIf="loggedIn">
    <a routerLink="status">Status</a>
    <a routerLink="offers">Offers</a>
    <a routerLink="order">Order</a>
    <a routerLink="support">Support</a>
    <a routerLink="profile">Profile</a>
  </span>
  <a routerLink="promotions">Promotions</a>
  <button *ngIf="loggedIn" (click)="logout.emit()">Logout</button>

  `
})

export class AppMenu {
  @Input() loggedIn: boolean;
  @Output() logout = new EventEmitter();
}
