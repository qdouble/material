import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormInputModule } from '../../components/input-fields/form-input';
import { FooterModule } from '../footer';
import { MATERIAL_MODULES } from '../../material.modules';
import { SelectInputModule } from '../../components/input-fields/select-input';
import { SelectedPrizeModule } from '../status/common/selected-prize';

import { OrderComponent } from './order';
import { OrderFormComponent, OrderTableComponent } from './common';

@NgModule({
  imports: [
    CommonModule,
    FormInputModule,
    FooterModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
    SelectInputModule,
    SelectedPrizeModule
  ],
  declarations: [OrderComponent, OrderFormComponent, OrderTableComponent]
})
export class OrderModule {}
