import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FormInputModule } from '../../components/input-fields/form-input';
import { FooterModule } from '../footer';

import { ReferralsTable } from './common/referrals-table';
import { SelectedPrizeModule } from './common/selected-prize';
import { Status } from './status';

@NgModule({
  imports: [
    CommonModule,
    FormInputModule,
    FooterModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Status }]),
    SelectedPrizeModule
  ],
  declarations: [
    ReferralsTable,
    Status
  ]
})

export class StatusModule { }
