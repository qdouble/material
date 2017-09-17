import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from '../../../material.modules';

import { SelectInput } from './select-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_MODULES
  ],
  declarations: [SelectInput],
  exports: [SelectInput]
})

export class SelectInputModule { }
