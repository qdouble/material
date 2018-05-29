import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormInputModule } from '../../components/input-fields/form-input';
import { FooterModule } from '../footer';
import { MATERIAL_MODULES } from '../../material.modules';

import { ReferralsTable } from './common/referrals-table';
import { SelectedPrizeModule } from './common/selected-prize';
import { Status } from './status';

@NgModule({
  imports: [
    CommonModule,
    FormInputModule,
    FooterModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Status }]),
    SelectedPrizeModule
  ],
  declarations: [ReferralsTable, Status]
})
export class StatusModule {}
