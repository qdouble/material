export interface Ticket {
  readonly id?: string;
  readonly name?: string;
  readonly imageUrl?: string;
  readonly orderOptions?: string;
  readonly description?: string;
  readonly userMessage?: string;
  readonly prizeValue?: string;
  readonly referralsRequired?: number;
}
