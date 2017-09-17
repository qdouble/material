import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MATERIAL_MODULES } from '../../material.modules';

import { routes } from './crediting-guidelines.routing';
import { CreditingGuidelines } from './crediting-guidelines';


@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    RouterModule.forChild(routes)
  ],
  declarations: [CreditingGuidelines]
})

export class CreditingGuidelinesModule {}

