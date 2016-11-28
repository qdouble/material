import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CreditRequest } from '../../../../models/credit-request';

@Component({
  selector: 'os-credit-request-table',
  templateUrl: './credit-request-table.html',
  styleUrls: ['./credit-request-table.css'],
})

export class CreditRequestTable {
  @Input() loading: boolean;
  @Input() creditRequests: CreditRequest[];
  @Output() viewCreditRequest = new EventEmitter();
}
