import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Prize } from '../../../../models/prize';

@Component({
  selector: 'os-selected-prize',
  templateUrl: './selected-prize.html',
  styleUrls: ['./selected-prize.css']
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
};
