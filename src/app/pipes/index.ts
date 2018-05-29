import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostToUserPipe } from './cost-to-user';
import { EarnPerReferralPipe } from './earn-per-referral';
import { FloorPipe } from './floor';
import { LinkifyPipe } from './linkify';
import { SafeUrlPipe } from './safe-url';
import { SingleSafePipe } from './single-safe';
import { ShowMaxPipe } from './show-max';
import { TimeAgoPipe } from './time-ago';
import { TimeAgoRecentPipe } from './time-ago-recent';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe,
    LinkifyPipe,
    SafeUrlPipe,
    SingleSafePipe,
    ShowMaxPipe,
    TimeAgoPipe,
    TimeAgoRecentPipe
  ],
  exports: [
    CostToUserPipe,
    EarnPerReferralPipe,
    FloorPipe,
    LinkifyPipe,
    SafeUrlPipe,
    SingleSafePipe,
    ShowMaxPipe,
    TimeAgoPipe,
    TimeAgoRecentPipe
  ]
})
export class CustomPipesModule {}
