import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './privacy-policy.routing';
import { PrivacyPolicy } from './privacy-policy';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivacyPolicy]
})

export class PrivacyPolicyModule {}