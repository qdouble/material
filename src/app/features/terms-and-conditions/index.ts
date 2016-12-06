import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './terms-and-conditions.routing';
import { TermsAndConditions } from './terms-and-conditions';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsAndConditions]
})

export class TermsAndConditionsModule {}

