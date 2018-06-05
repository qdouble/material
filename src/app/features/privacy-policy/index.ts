import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PrivacyPolicy } from './privacy-policy';
import { routes } from './privacy-policy.routing';

@NgModule({
  imports: [CommonModule, MatCardModule, RouterModule.forChild(routes)],
  declarations: [PrivacyPolicy]
})
export class PrivacyPolicyModule {}
