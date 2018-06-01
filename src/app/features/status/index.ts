import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatCommonModule,
  MatSortModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatSlideToggleModule,
  MatButtonModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { FormInputModule } from '../../components/input-fields/form-input';
import { FooterModule } from '../footer';

import { ReferralsTable } from './common/referrals-table';
import { SelectedPrizeModule } from './common/selected-prize';
import { Status } from './status';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    FlexLayoutModule,
    FormInputModule,
    FooterModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatCommonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Status }]),
    SelectedPrizeModule
  ],

  declarations: [ReferralsTable, Status]
})
export class StatusModule {}
