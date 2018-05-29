import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from '../../../material.modules';

import { TextareaInput } from './textarea-input';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MATERIAL_MODULES],
  declarations: [TextareaInput],
  exports: [TextareaInput]
})
export class TextareaInputModule {}
