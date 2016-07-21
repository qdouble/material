import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, Output
} from '@angular/core';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { Prize } from '../models';
import { PrizeItem } from './prize-item';

@Component({
  selector: 'prizes-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [PrizeItem, REACTIVE_FORM_DIRECTIVES],
  template: `
  <form [formGroup]="form">
    <span *ngFor="let prize of prizes; let i = index">
      <prize-item [prize]="prize" [index]="i" [form]="form">
      </prize-item>
    </span>
  </form>
  `
})

export class PrizesDisplay {
  @Input() form;
  @Input() currentPrize;
  @Input() prizes: Prize;
  @Output() selectPrize = new EventEmitter(false);
}
