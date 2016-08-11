import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Prize } from '../models';

@Component({
  selector: 'prizes-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
