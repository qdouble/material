import { GenericResponse } from './generic-response';

export interface Notification {
  readonly id?: number;
  readonly message?: string;
  readonly message_type?: string;
  readonly status?: number;
  readonly read?: boolean;
  readonly createdAt?: string;
  readonly ico?: string;
}

export interface DeleteNotificationsResponse extends GenericResponse {
  ids: number[];
}

export interface GetNotificationsResponse extends GenericResponse {
  notifications: Notification[];
  unreadTotal: number;
}

export interface MarkAllAsReadResponse extends GenericResponse {
  result: any;
}

export interface MarkNotificationAsReadResponse extends GenericResponse {
  ids: number[];
  read: boolean;
}
