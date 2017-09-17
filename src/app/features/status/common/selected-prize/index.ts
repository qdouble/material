import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MATERIAL_MODULES } from '../../../../material.modules';

import { SelectInputModule } from '../../../../components/input-fields/select-input';
import { SelectedPrizeComponent } from './selected-prize';

@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    SelectInputModule
  ],
  declarations: [
    SelectedPrizeComponent
  ],
  exports: [
    SelectedPrizeComponent
  ]
})

export class SelectedPrizeModule { }
