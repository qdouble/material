import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from '../../../material.modules';

import { FormInput } from './form-input';

@NgModule({
  imports: [CommonModule, MATERIAL_MODULES, ReactiveFormsModule],
  declarations: [FormInput],
  exports: [FormInput]
})
export class FormInputModule {}
