import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'os-sanity',
  template: `This is a sanity check component for testing.`
})
export class SanityComp {
  url = 'https://github.com/preboot/angular2-webpack';
}

@NgModule({
  imports: [CommonModule],
  declarations: [SanityComp]
})
export class SanityModule {}
