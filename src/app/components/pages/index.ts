import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from '../../material.modules';
import { PagesComponent } from './pages';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MATERIAL_MODULES
  ],
  declarations: [PagesComponent],
  exports: [PagesComponent]
})

export class PagesModule { }
