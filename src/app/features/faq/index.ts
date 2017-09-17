import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MATERIAL_MODULES } from '../../material.modules';
import { FAQ } from './faq';
import { FooterModule } from '../footer';

import { routes } from './faq.routing';


@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MATERIAL_MODULES,
    RouterModule.forChild(routes)
  ],
  declarations: [FAQ]
})

export class FAQModule {}
