import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, Output
} from '@angular/core';

import { Prize } from '../models/prize';

@Component({
  selector: 'prizes-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './prizes-display.html'
})

export class PrizesDisplay {
  @Input() form;
  @Input() currentPrize;
  @Input() prizes: Prize;
  @Output() selectPrize = new EventEmitter(false);
  trackById(index: number, prize: Prize) {
    return prize.id;
  }
}
