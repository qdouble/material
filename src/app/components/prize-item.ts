import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Prize } from '../models/prize';

@Component({
  selector: 'prize-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  .prize-item {
    display: inline-block;
    text-align: center;
  }
  img { max-width: 100px; }`
  ],
  templateUrl: './prize-item.html'
})

export class PrizeItem implements OnChanges {
  @Input() currentPrize;
  @Input() form: FormGroup;
  @Input() index: number;
  @Input() prize: Prize;
  @Output() selectPrize = new EventEmitter(false);
  ngOnChanges(changes: SimpleChanges) {
    if (this.prize && this.prize.id && !this.form.get('selectedPrize')) {
      this.form.addControl('selectedPrize', new FormControl(this.prize.id));
    }
  }
}
