import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { User } from '../../../models/user';

@Component({
  selector: 'os-order-form',
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.scss']
})
export class OrderFormComponent {
  accountTypes = ['Checking', 'Savings'];
  @Input() form: FormGroup;
  @Input() loaded: boolean;
  @Input() needBankInfo: boolean;
  @Input() needPaypalEmail: boolean;
  @Input() placing: boolean;
  @Input() user: User;
  @Output() placeOrder = new EventEmitter();
}
