import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MATERIAL_MODULES } from '../../material.modules';
import { FooterComponent } from './footer';


@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    RouterModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})

export class FooterModule {}

