import { ResponseType } from '@angular/http';
export interface Notify {
  readonly id?: string;
  readonly message?: string;
  readonly status?: string | number;
  readonly type?: string | ResponseType;
}
