import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ticket } from '../../ticket.model';

@Component({
  selector: 'os-support-ticket-table',
  templateUrl: './support-ticket-table.html',
  styleUrls: ['./support-ticket-table.scss']
})
export class SupportTicketTable {
  @Input() loading: boolean;
  @Input() tickets: Ticket[];
  @Output() closeTicket = new EventEmitter();
  @Output() sortBy = new EventEmitter();
  @Output() viewTicket = new EventEmitter();
  trackById(index: number, ticket: Ticket) {
    return ticket.id;
  }
}
