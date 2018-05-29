import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatCommonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FormInputModule } from '../../components/input-fields/form-input';
import { FooterModule } from '../footer';
import { MATERIAL_MODULES } from '../../material.modules';

import { ReferralsTable } from './common/referrals-table';
import { SelectedPrizeModule } from './common/selected-prize';
import { Status } from './status';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    FormInputModule,
    FooterModule,
    MATERIAL_MODULES,
    MatTableModule,
    MatCommonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Status }]),
    SelectedPrizeModule
  ],
  exports: [CdkTableModule, MATERIAL_MODULES, MatTableModule, MatCommonModule, MatPaginatorModule],
  declarations: [ReferralsTable, Status]
})
export class StatusModule {}
