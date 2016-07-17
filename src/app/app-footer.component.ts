import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-footer',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app-footer.component.html')
})

export class AppFooter {
  @Input() loggedIn: boolean;
}
