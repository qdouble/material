import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CreditRequest } from '../../credit-request.model';

@Component({
  selector: 'os-credit-request-table',
  templateUrl: './credit-request-table.html',
  styleUrls: ['./credit-request-table.scss']
})
export class CreditRequestTable {
  @Input() loading: boolean;
  @Input() creditRequests: CreditRequest[];
  @Output() viewCreditRequest = new EventEmitter();
  trackById(index: number, credit: CreditRequest) {
    return credit.id;
  }
}
