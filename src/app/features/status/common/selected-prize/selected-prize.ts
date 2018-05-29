import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Prize } from '../../../../models/prize';

@Component({
  selector: 'os-selected-prize',
  templateUrl: './selected-prize.html',
  styleUrls: ['./selected-prize.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectedPrizeComponent {
  @Input() changePrize: boolean;
  @Input() form;
  @Input() prize: Prize;
  @Input() prizes: Prize[];
  @Input() selectedPrizeLabels: string[] = [];
  @Input() selectedPrizeValues: string[] = [];
  @Output() cancelPrizeChange = new EventEmitter();
  @Output() changeSelectedPrize = new EventEmitter();
}
