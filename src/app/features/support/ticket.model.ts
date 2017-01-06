export interface Ticket {
  readonly id: string;
  readonly subject?: string;
  readonly question?: string;
  readonly messages?: TicketMessage[];
  readonly closed?: boolean;
  readonly adminOrigin?: boolean;
  readonly readByAdmin?: boolean;
  readonly readByUser?: boolean;
  readonly entries?: number;
  readonly lastEntry?: Date;
  readonly lastEntryBy?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface TicketMessage {
  readonly id?: string;
  readonly message?: string;
  readonly ticketId?: string;
  readonly adminName?: string;
  readonly updatedAt?: Date;
}
