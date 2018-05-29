import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterModule } from '../footer';
import { MATERIAL_MODULES } from '../../material.modules';
import { routes } from './contact-us.routing';
import { ContactUs } from './contact-us';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactUs],
  exports: [ContactUs]
})
export class ContactUsModule {}
