import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { routes } from './crediting-guidelines.routing';
import { CreditingGuidelines } from './crediting-guidelines';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreditingGuidelines]
})

export class CreditingGuidelinesModule {}

