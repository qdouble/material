import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostToUserPipe } from './cost-to-user';
import { EarnPerReferralPipe } from './earn-per-referral';
import { FloorPipe } from './floor';
import { ShowMaxPipe } from './show-max';
import { TimeAgoPipe } from './time-ago';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe,
    ShowMaxPipe,
    TimeAgoPipe
  ],
  exports: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe,
    ShowMaxPipe,
    TimeAgoPipe
  ]
})

export class CustomPipesModule { }
