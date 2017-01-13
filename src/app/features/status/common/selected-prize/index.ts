import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SelectInputModule } from '../../../../components/input-fields/select-input';
import { SelectedPrizeComponent } from './selected-prize';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
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
