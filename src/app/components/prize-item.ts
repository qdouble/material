import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, OnChanges, Output
} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { Prize } from '../models';

@Component({
  selector: 'prize-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [REACTIVE_FORM_DIRECTIVES],
  styles: [`
  .prize-item {
    display: inline-block;
    text-align: center;
  }
  img { max-width: 100px; }`
  ],
  template: `
  <span class="prize-item">
    <img [src]="prize.imageUrl" [alt]="prize.name"><br>
    {{prize.name}}<br>
    <input type="radio" [formControl]="form.controls.selectedPrize" 
      [value]="prize.id" ><br>
  </span>
  `
})

export class PrizeItem implements OnChanges {
  @Input() currentPrize;
  @Input() form: FormGroup;
  @Input() index: number;
  @Input() prize: Prize;
  @Output() selectPrize = new EventEmitter(false);
  ngOnChanges() {
    if (this.prize && this.prize.id && !this.form.find('selectedPrize')) {
      this.form.addControl('selectedPrize', new FormControl(this.prize.id));
    }
  }
}
