export type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  title: string;
  options: PushOptions;
}

export interface PushOptions {
  body?: string;
  icon?: string;
  tag?: string;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
