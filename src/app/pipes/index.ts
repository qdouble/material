import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostToUserPipe } from './cost-to-user';
import { EarnPerReferralPipe } from './earn-per-referral';
import { FloorPipe } from './floor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe
  ],
  exports: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe
  ]
})

export class CustomPipesModule { }
