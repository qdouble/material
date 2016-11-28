import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ticket } from '../../../../models/ticket';

@Component({
  selector: 'os-referrals-table',
  templateUrl: './referrals-table.html',
  styleUrls: ['./referrals-table.css'],
})

export class ReferralsTable {
  @Input() loading: boolean;
  @Input() referrals: Ticket[];
  @Output() reload = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewReferral = new EventEmitter();
}
