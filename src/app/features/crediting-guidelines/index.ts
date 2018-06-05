import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CreditingGuidelines } from './crediting-guidelines';
import { routes } from './crediting-guidelines.routing';

@NgModule({
  imports: [CommonModule, MatCardModule, RouterModule.forChild(routes)],
  declarations: [CreditingGuidelines]
})
export class CreditingGuidelinesModule {}
