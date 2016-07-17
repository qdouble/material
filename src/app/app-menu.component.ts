import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-menu',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app-menu.component.html')
})

export class AppMenu {
  @Input() loggedIn: boolean;
  @Output() logout = new EventEmitter();
}
