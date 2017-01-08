import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';


import { FAQ } from './faq';
import { FooterModule } from '../footer';

import { routes } from './faq.routing';


@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FAQ]
})

export class FAQModule {}
