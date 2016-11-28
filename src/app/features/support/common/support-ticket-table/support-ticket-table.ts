import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ticket } from '../../../../models/ticket';

@Component({
  selector: 'os-support-ticket-table',
  templateUrl: './support-ticket-table.html',
  styleUrls: ['./support-ticket-table.css'],
})

export class SupportTicketTable {
  @Input() loading: boolean;
  @Input() tickets: Ticket[];
  @Output() closeTicket = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewTicket = new EventEmitter();
}
