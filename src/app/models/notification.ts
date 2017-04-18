// import { ResponseType } from '@angular/http';
export interface Notification {
  readonly id?: string | number;
  readonly message?: string;
  readonly read?: boolean;
  readonly createdAt?: string;
  readonly ico?: string;
}
