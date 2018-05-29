import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'os-store-devtools',
  templateUrl: './store-devtools.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  mat-sidenav-container {
    width: 70% !important;
  }
  `
  ]
})
export class StoreDevToolsComponent {}
