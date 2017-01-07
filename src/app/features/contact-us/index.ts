import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FooterModule } from '../footer';
import { routes } from './contact-us.routing';
import { ContactUs } from './contact-us';


@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactUs],
  exports: [ContactUs]
})

export class ContactUsModule {}
